import { useState, useEffect, useCallback } from "react";
import { Balloon } from "./Balloon";
import { GameUI } from "./GameUI";
import { GameOver } from "./GameOver";
import { toast } from "sonner";

interface BalloonData {
  id: string;
  color: string;
  speed: number;
  xPosition: number;
}

const BALLOON_COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];
const INITIAL_LIVES = 5;
const SPAWN_INTERVAL = 1500; // milliseconds
const MIN_SPEED = 4; // seconds
const MAX_SPEED = 7; // seconds

export const BalloonGame = () => {
  const [balloons, setBalloons] = useState<BalloonData[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [spawnInterval, setSpawnInterval] = useState(SPAWN_INTERVAL);

  const createBalloon = useCallback((): BalloonData => {
    const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const xPosition = 5 + Math.random() * 85; // Keep balloons within 5-95% of screen width
    
    return {
      id: `balloon-${Date.now()}-${Math.random()}`,
      color,
      speed,
      xPosition,
    };
  }, []);

  const handlePop = useCallback((id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => prev + 10);
    
    // Increase difficulty - spawn balloons faster as score increases
    if (score > 0 && score % 50 === 0) {
      setSpawnInterval((prev) => Math.max(800, prev - 100));
    }
  }, [score]);

  const handleMiss = useCallback((id: string) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setLives((prev) => {
      const newLives = prev - 1;
      if (newLives <= 0) {
        setGameOver(true);
        toast.error("Game Over!");
      }
      return newLives;
    });
  }, []);

  const handleRestart = useCallback(() => {
    setBalloons([]);
    setScore(0);
    setLives(INITIAL_LIVES);
    setGameOver(false);
    setSpawnInterval(SPAWN_INTERVAL);
    toast.success("New Game Started!");
  }, []);

  // Spawn balloons
  useEffect(() => {
    if (gameOver || isPaused) return;

    const interval = setInterval(() => {
      setBalloons((prev) => [...prev, createBalloon()]);
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [createBalloon, gameOver, isPaused, spawnInterval]);

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

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)]">
      {/* Game UI */}
      <GameUI score={score} lives={lives} maxLives={INITIAL_LIVES} isPaused={isPaused} />

      {/* Balloons */}
      <div className="absolute inset-0">
        {balloons.map((balloon) => (
          <Balloon
            key={balloon.id}
            id={balloon.id}
            color={balloon.color}
            onPop={handlePop}
            onMiss={handleMiss}
            speed={balloon.speed}
            xPosition={balloon.xPosition}
          />
        ))}
      </div>

      {/* Game Over Screen */}
      {gameOver && <GameOver score={score} onRestart={handleRestart} />}

      {/* Instructions (only show initially) */}
      {!gameOver && score === 0 && balloons.length === 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-slide-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-lg font-semibold text-foreground">
              🎈 Tap balloons to pop them!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Don't let them escape! Press ESC to pause
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
