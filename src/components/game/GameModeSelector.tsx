import { Button } from "@/components/ui/button";
import { Trophy, Clock, Infinity } from "lucide-react";

export type GameMode = "classic" | "timeattack" | "endless";

interface GameModeSelectorProps {
  onSelectMode: (mode: GameMode) => void;
}

export const GameModeSelector = ({ onSelectMode }: GameModeSelectorProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 bg-gradient-to-b from-[hsl(200,100%,85%)] to-[hsl(330,85%,80%)]">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-12 shadow-2xl text-center max-w-lg mx-4 animate-slide-up">
        <h1 className="text-5xl font-bold text-primary mb-3">Balloon Pop</h1>
        <p className="text-muted-foreground mb-8">Choose your game mode</p>
        
        <div className="space-y-4">
          <Button
            onClick={() => onSelectMode("classic")}
            size="lg"
            className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Classic Mode
          </Button>
          
          <Button
            onClick={() => onSelectMode("timeattack")}
            size="lg"
            variant="secondary"
            className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Clock className="w-5 h-5 mr-2" />
            Time Attack (60s)
          </Button>
          
          <Button
            onClick={() => onSelectMode("endless")}
            size="lg"
            className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-accent hover:bg-accent/90"
          >
            <Infinity className="w-5 h-5 mr-2" />
            Endless Mode
          </Button>
        </div>
      </div>
    </div>
  );
};
