import { useState, useEffect, useCallback, useRef } from "react";
import { Balloon } from "./Balloon";
import { GameUI } from "./GameUI";
import { GameOver } from "./GameOver";
import { GameModeSelector, GameMode } from "./GameModeSelector";
import { PowerUp } from "./PowerUp";
import { ParticleEffect } from "./ParticleEffect";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAdMob } from "@/hooks/useAdMob";
import { getGameSettings } from "@/pages/Settings";
import { saveScore, saveGameStats } from "@/pages/Scores";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const [showReplayDialog, setShowReplayDialog] = useState(false);
  const gameStartTimeRef = useRef<number>(Date.now());
  const gameOverProcessedRef = useRef(false);
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

  const handleGameOver = useCallback((finalScore: number) => {
    if (gameOverProcessedRef.current) return;
    gameOverProcessedRef.current = true;
    
    setGameOver(true);
    playGameOver();
    
    const playTime = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
    saveScore(settings.displayName, finalScore, gameMode || "classic");
    saveGameStats(finalScore, gameMode || "classic", playTime);
    
    showInterstitialAd();
    
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem("balloonHighScore", finalScore.toString());
      toast.success("New High Score!", { id: "highscore" });
    } else {
      toast.error("Game Over!", { id: "gameover" });
    }
  }, [gameMode, highScore, playGameOver, settings.displayName, showInterstitialAd]);

  const handleMiss = useCallback((id: string, type?: "normal" | "golden" | "bomb") => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    
    // Don't deduct lives for bombs (they already reduce score) or in endless mode
    if (gameMode === "endless" || type === "bomb") return;
    
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        handleGameOver(score);
      }
      return newLives;
    });
  }, [gameMode, score, handleGameOver]);

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
    gameOverProcessedRef.current = false;
    gameStartTimeRef.current = Date.now();
  }, [gameMode]);

  const handleReplay = useCallback(() => {
    if (!gameOver && score > 0) {
      setShowReplayDialog(true);
    } else {
      handleRestart();
    }
  }, [gameOver, score, handleRestart]);

  const handleQuit = useCallback(() => {
    if (!gameOver && score > 0) {
      setShowQuitDialog(true);
    } else {
      handleRestart();
    }
  }, [gameOver, score, handleRestart]);

  const handleConfirmQuit = useCallback(async () => {
    const playTime = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
    saveScore(settings.displayName, score, gameMode || "classic");
    saveGameStats(score, gameMode || "classic", playTime);
    toast.success("Score saved!", { id: "savescore" });
    setShowQuitDialog(false);
    handleRestart();
  }, [score, gameMode, settings.displayName, handleRestart]);

  const handleConfirmReplay = useCallback(async () => {
    const playTime = Math.floor((Date.now() - gameStartTimeRef.current) / 1000);
    saveScore(settings.displayName, score, gameMode || "classic");
    saveGameStats(score, gameMode || "classic", playTime);
    toast.success("Score saved!", { id: "savescore" });
    setShowReplayDialog(false);
    handleRestart();
  }, [score, gameMode, settings.displayName, handleRestart]);

  const handleModeSelect = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setLives(mode === "endless" ? 999 : difficultySettings.initialLives);
    if (mode === "timeattack") {
      setTimeLeft(difficultySettings.timeAttackDuration);
    }
    gameStartTimeRef.current = Date.now();
    gameOverProcessedRef.current = false;
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
          clearInterval(interval);
          handleGameOver(score);
          toast.info("Time's Up!", { id: "timeout" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameMode, gameOver, isPaused, score, handleGameOver]);

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
        onReplay={handleReplay}
        onQuit={handleQuit}
      />

      <div className="absolute inset-0">
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            id={balloon.id}
            color={balloon.color}
            type={balloon.type}
            onPop={handlePop}
            onMiss={(id) => handleMiss(id, balloon.type)}
            speed={balloon.speed}
            xPosition={balloon.xPosition}
            isPaused={isPaused}
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
            isPaused={isPaused}
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
          onExtraLife={async () => {
            const granted = await showRewardAd();
            if (granted) {
              setLives(1);
              setGameOver(false);
              gameOverProcessedRef.current = false;
              toast.success("Continue playing!", { id: "continue" });
            } else {
              toast.error("Ad not available", { id: "adnotavailable" });
            }
          }}
        />
      )}

      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to save your current score ({score} points) before quitting?
              You'll watch a short ad to save your progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowQuitDialog(false);
              handleRestart();
            }}>
              Quit Without Saving
            </AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await showInterstitialAd();
              handleConfirmQuit();
            }}>
              Save & Quit (Watch Ad)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showReplayDialog} onOpenChange={setShowReplayDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Progress?</AlertDialogTitle>
            <AlertDialogDescription>
              Would you like to save your current score ({score} points) before starting a new game?
              You'll watch a short ad to save your progress.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setShowReplayDialog(false);
              handleRestart();
            }}>
              Don't Save
            </AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await showInterstitialAd();
              handleConfirmReplay();
            }}>
              Save & Replay (Watch Ad)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
