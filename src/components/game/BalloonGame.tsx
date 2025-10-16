import { useState, useEffect, useCallback } from "react";
import { Balloon } from "./Balloon";
import { GameUI } from "./GameUI";
import { GameOver } from "./GameOver";
import { GameModeSelector, GameMode } from "./GameModeSelector";
import { PowerUp } from "./PowerUp";
import { ParticleEffect } from "./ParticleEffect";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAdMob } from "@/hooks/useAdMob";
import { getGameSettings } from "@/pages/Settings";
import { saveScore } from "@/pages/Scores";
import { toast } from "sonner";

interface BalloonData {
  id: string;
  color: string;
  type?: "normal" | "golden" | "bomb";
  speed: number;
  xPosition: number;
}

interface PowerUpData {
  id: string;
  type: "slowmo" | "extralife" | "doublescore" | "multipop";
  speed: number;
  xPosition: number;
}

interface ParticleData {
  id: string;
  x: number;
  y: number;
  color: string;
}

const BALLOON_COLORS = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];

const getDifficultySettings = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return {
        initialLives: 7,
        spawnInterval: 2000,
        minSpeed: 3,
        maxSpeed: 5,
        timeAttackDuration: 90,
      };
    case "hard":
      return {
        initialLives: 3,
        spawnInterval: 1000,
        minSpeed: 5,
        maxSpeed: 9,
        timeAttackDuration: 45,
      };
    default: // medium
      return {
        initialLives: 5,
        spawnInterval: 1500,
        minSpeed: 4,
        maxSpeed: 7,
        timeAttackDuration: 60,
      };
  }
};

export const BalloonGame = () => {
  const settings = getGameSettings();
  const difficultySettings = getDifficultySettings(settings.difficulty);
  
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [powerUps, setPowerUps] = useState<PowerUpData[]>([]);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("balloonHighScore") || "0");
  });
  const [lives, setLives] = useState(difficultySettings.initialLives);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [spawnInterval, setSpawnInterval] = useState(difficultySettings.spawnInterval);
  const [timeLeft, setTimeLeft] = useState(difficultySettings.timeAttackDuration);
  const [activePowerUps, setActivePowerUps] = useState<Record<string, boolean>>({});
  const { playPop, playPowerUp, playGameOver } = useSoundEffects();
  const { showBannerAd, hideBannerAd, showInterstitialAd, showRewardAd } = useAdMob();

  const createBalloon = useCallback((): BalloonData => {
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const speed = activePowerUps.slowmo 
      ? (difficultySettings.minSpeed + Math.random() * (difficultySettings.maxSpeed - difficultySettings.minSpeed)) * 1.5 
      : difficultySettings.minSpeed + Math.random() * (difficultySettings.maxSpeed - difficultySettings.minSpeed);
    const xPosition = 5 + Math.random() * 85;
    
    const random = Math.random();
    let type: "normal" | "golden" | "bomb" = "normal";
    if (random > 0.95) type = "golden";
    else if (random > 0.9) type = "bomb";
    
    return {
      id: `balloon-${Date.now()}-${Math.random()}`,
      color,
      type,
      speed,
      xPosition,
    };
  }, [activePowerUps.slowmo, difficultySettings]);

  const createPowerUp = useCallback((): PowerUpData => {
    const types: PowerUpData["type"][] = ["slowmo", "extralife", "doublescore", "multipop"];
    const type = types[Math.floor(Math.random() * types.length)];
    const speed = difficultySettings.minSpeed + Math.random() * (difficultySettings.maxSpeed - difficultySettings.minSpeed);
    const xPosition = 5 + Math.random() * 85;
    
    return {
      id: `powerup-${Date.now()}-${Math.random()}`,
      type,
      speed,
      xPosition,
    };
  }, [difficultySettings]);

  const handlePop = useCallback((id: string, points: number = 10) => {
    const balloon = balloons.find(b => b.id === id);
    if (balloon && settings.particlesEnabled) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        setParticles(prev => [...prev, {
          id: `particle-${Date.now()}`,
          x: rect.left,
          y: rect.top,
          color: balloon.color
        }]);
      }
    }
    
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    const scoreMultiplier = activePowerUps.doublescore ? 2 : 1;
    setScore((prev) => prev + (points * scoreMultiplier));
    playPop();
    
    if (score > 0 && score % 50 === 0) {
      setSpawnInterval((prev) => Math.max(800, prev - 100));
    }
  }, [score, balloons, activePowerUps.doublescore, playPop, settings.particlesEnabled]);

  const handleMiss = useCallback((id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    if (gameMode !== "endless") {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          playGameOver();
          saveScore(settings.displayName, score, gameMode);
          showInterstitialAd(); // Show ad on game over
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("balloonHighScore", score.toString());
            toast.success("New High Score!");
          } else {
            toast.error("Game Over!");
          }
        }
        return newLives;
      });
    }
  }, [gameMode, score, highScore, playGameOver, settings.displayName, showInterstitialAd]);

  const handlePowerUpCollect = useCallback((id: string, type: string) => {
    setPowerUps((prev) => prev.filter((p) => p.id !== id));
    playPowerUp();
    
    switch(type) {
      case "slowmo":
        setActivePowerUps(prev => ({ ...prev, slowmo: true }));
        toast.success("Slow Motion Activated!");
        setTimeout(() => setActivePowerUps(prev => ({ ...prev, slowmo: false })), 10000);
        break;
      case "extralife":
        setLives(prev => prev + 1);
        toast.success("Extra Life!");
        break;
      case "doublescore":
        setActivePowerUps(prev => ({ ...prev, doublescore: true }));
        toast.success("Double Score!");
        setTimeout(() => setActivePowerUps(prev => ({ ...prev, doublescore: false })), 10000);
        break;
      case "multipop":
        setActivePowerUps(prev => ({ ...prev, multipop: true }));
        toast.success("Multi Pop!");
        setTimeout(() => setActivePowerUps(prev => ({ ...prev, multipop: false })), 5000);
        break;
    }
  }, [playPowerUp]);

  const handlePowerUpMiss = useCallback((id: string) => {
    setPowerUps((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleRestart = useCallback(() => {
    const newSettings = getGameSettings();
    const newDifficultySettings = getDifficultySettings(newSettings.difficulty);
    
    setBalloons([]);
    setPowerUps([]);
    setParticles([]);
    setScore(0);
    setLives(gameMode === "endless" ? 999 : newDifficultySettings.initialLives);
    setGameOver(false);
    setGameMode(null);
    setSpawnInterval(newDifficultySettings.spawnInterval);
    setTimeLeft(newDifficultySettings.timeAttackDuration);
    setActivePowerUps({});
    toast.success("New Game Started!");
  }, [gameMode]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setLives(mode === "endless" ? 999 : difficultySettings.initialLives);
    if (mode === "timeattack") {
      setTimeLeft(difficultySettings.timeAttackDuration);
    }
  }, [difficultySettings]);

  // Spawn balloons
  useEffect(() => {
    if (gameOver || isPaused || !gameMode) return;

    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, createBalloon()]);
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [createBalloon, gameOver, isPaused, spawnInterval, gameMode]);

  // Spawn power-ups
  useEffect(() => {
    if (gameOver || isPaused || !gameMode) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPowerUps((prev) => [...prev, createPowerUp()]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [createPowerUp, gameOver, isPaused, gameMode]);

  // Time attack countdown
  useEffect(() => {
    if (gameMode !== "timeattack" || gameOver || isPaused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          playGameOver();
          const currentScore = score;
          const currentHighScore = highScore;
          saveScore(settings.displayName, currentScore, gameMode || "classic");
          if (currentScore > currentHighScore) {
            setHighScore(currentScore);
            localStorage.setItem("balloonHighScore", currentScore.toString());
            toast.success("New High Score!");
          } else {
            toast.info("Time's Up!");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameMode, gameOver, isPaused, playGameOver, settings.displayName]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !gameOver) {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver]);

  if (!gameMode) {
    return <GameModeSelector onSelectMode={handleModeSelect} />;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)]">
      <GameUI 
        score={score} 
        highScore={highScore}
        lives={lives} 
        maxLives={difficultySettings.initialLives} 
        isPaused={isPaused}
        gameMode={gameMode}
        timeLeft={gameMode === "timeattack" ? timeLeft : undefined}
        activePowerUps={activePowerUps}
        onPause={() => setIsPaused(true)}
        onResume={() => setIsPaused(false)}
        onQuit={handleRestart}
      />

      <div className="absolute inset-0">
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            id={balloon.id}
            color={balloon.color}
            type={balloon.type}
            onPop={handlePop}
            onMiss={handleMiss}
            speed={balloon.speed}
            xPosition={balloon.xPosition}
          />
        ))}
        
        {powerUps.map((powerUp) => (
          <PowerUp
            key={powerUp.id}
            id={powerUp.id}
            type={powerUp.type}
            onCollect={handlePowerUpCollect}
            onMiss={handlePowerUpMiss}
            speed={powerUp.speed}
            xPosition={powerUp.xPosition}
          />
        ))}

        {particles.map((particle) => (
          <ParticleEffect
            key={particle.id}
            x={particle.x}
            y={particle.y}
            color={particle.color}
            onComplete={() => setParticles(prev => prev.filter(p => p.id !== particle.id))}
          />
        ))}
      </div>

      {gameOver && (
        <GameOver 
          score={score} 
          highScore={highScore} 
          onRestart={handleRestart}
          onExtraLife={() => {
            setLives(1);
            setGameOver(false);
            toast.success("Continue playing!");
          }}
        />
      )}

      {!gameOver && score === 0 && balloons.length === 0 && gameMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-lg font-semibold text-foreground">
              🎈 Tap balloons to pop them!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              ⭐ Golden = 50pts | 💣 Bomb = -20pts | Press ESC to pause
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
