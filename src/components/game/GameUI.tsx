import { Heart, Clock, Zap, Star, Pause, Play, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GameMode } from "./GameModeSelector";

interface GameUIProps {
  score: number;
  highScore: number;
  lives: number;
  maxLives: number;
  isPaused: boolean;
  gameMode: GameMode;
  timeLeft?: number;
  activePowerUps: Record<string, boolean>;
  onPause?: () => void;
  onResume?: () => void;
  onQuit?: () => void;
}

export const GameUI = ({ 
  score, 
  highScore, 
  lives, 
  maxLives, 
  isPaused, 
  gameMode, 
  timeLeft, 
  activePowerUps,
  onPause,
  onResume,
  onQuit
}: GameUIProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-4">
          {/* Score */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-slide-up">
            <div className="text-sm font-medium text-muted-foreground">Score</div>
            <div className="text-3xl md:text-4xl font-bold text-primary">{score}</div>
            {highScore > 0 && (
              <div className="text-xs text-muted-foreground mt-1">High: {highScore}</div>
            )}
          </div>

          {/* Game Controls */}
          <div className="flex items-center gap-2">
            {!isPaused ? (
              <Button
                variant="secondary"
                size="icon"
                onClick={onPause}
                className="rounded-xl shadow-lg"
              >
                <Pause className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="icon"
                onClick={onResume}
                className="rounded-xl shadow-lg"
              >
                <Play className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="destructive"
              size="icon"
              onClick={onQuit}
              className="rounded-xl shadow-lg"
            >
              <Home className="w-5 h-5" />
            </Button>
          </div>

          {/* Time Attack Timer */}
          {gameMode === "timeattack" && timeLeft !== undefined && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-slide-up">
              <div className="text-sm font-medium text-muted-foreground mb-1">Time</div>
              <div className="text-3xl md:text-4xl font-bold text-secondary flex items-center gap-2">
                <Clock className="w-6 h-6" />
                {timeLeft}s
              </div>
            </div>
          )}

          {/* Lives */}
          {gameMode !== "endless" && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-slide-up">
              <div className="text-sm font-medium text-muted-foreground mb-1">Lives</div>
              <div className="flex gap-2">
                {Array.from({ length: maxLives }).map((_, i) => (
                  <Heart
                    key={i}
                    className={cn(
                      "w-6 h-6 md:w-7 md:h-7 transition-all",
                      i < lives
                        ? "fill-destructive text-destructive animate-pulse-glow"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Active Power-ups */}
        {Object.keys(activePowerUps).some(key => activePowerUps[key]) && (
          <div className="flex gap-2 justify-center">
            {activePowerUps.slowmo && (
              <div className="bg-primary/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg animate-pulse-glow flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">Slow Mo</span>
              </div>
            )}
            {activePowerUps.doublescore && (
              <div className="bg-accent/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg animate-pulse-glow flex items-center gap-2">
                <Star className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-semibold text-accent-foreground">2x Score</span>
              </div>
            )}
            {activePowerUps.multipop && (
              <div className="bg-secondary/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg animate-pulse-glow flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary-foreground" />
                <span className="text-sm font-semibold text-secondary-foreground">Multi Pop</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl animate-slide-up">
            <div className="text-2xl font-bold text-foreground">Paused</div>
          </div>
        </div>
      )}
    </div>
  );
};
