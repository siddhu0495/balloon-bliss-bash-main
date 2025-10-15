import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameUIProps {
  score: number;
  lives: number;
  maxLives: number;
  isPaused: boolean;
}

export const GameUI = ({ score, lives, maxLives, isPaused }: GameUIProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        {/* Score */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg animate-slide-up">
          <div className="text-sm font-medium text-muted-foreground">Score</div>
          <div className="text-3xl md:text-4xl font-bold text-primary">{score}</div>
        </div>

        {/* Lives */}
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
