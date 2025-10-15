import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw } from "lucide-react";

interface GameOverProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export const GameOver = ({ score, highScore, onRestart }: GameOverProps) => {
  const isNewHighScore = score > highScore && highScore > 0;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-md animate-slide-up">
      <div className="bg-white rounded-3xl px-8 py-12 md:px-12 md:py-16 shadow-2xl text-center max-w-md mx-4">
        <div className="mb-6">
          <Trophy className="w-20 h-20 md:w-24 md:h-24 mx-auto text-accent animate-pulse-glow" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          {isNewHighScore ? "New High Score!" : "Game Over!"}
        </h2>
        
        <div className="mb-8 space-y-4">
          <div>
            <div className="text-lg text-muted-foreground mb-2">Final Score</div>
            <div className="text-5xl md:text-6xl font-bold text-primary">{score}</div>
          </div>
          
          {highScore > 0 && !isNewHighScore && (
            <div>
              <div className="text-sm text-muted-foreground mb-1">High Score</div>
              <div className="text-2xl font-bold text-accent">{highScore}</div>
            </div>
          )}
        </div>

        <Button
          onClick={onRestart}
          size="lg"
          className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
      </div>
    </div>
  );
};
