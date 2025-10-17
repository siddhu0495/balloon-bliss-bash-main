import { useEffect, useState } from "react";
import { Zap, Heart, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PowerUpProps {
  id: string;
  type: "slowmo" | "extralife" | "doublescore" | "multipop";
  onCollect: (id: string, type: string) => void;
  onMiss: (id: string) => void;
  speed: number;
  xPosition: number;
  isPaused: boolean;
}

const POWER_UP_ICONS = {
  slowmo: Clock,
  extralife: Heart,
  doublescore: Star,
  multipop: Zap,
};

export const PowerUp = ({ id, type, onCollect, onMiss, speed, xPosition, isPaused }: PowerUpProps) => {
  const [isCollected, setIsCollected] = useState(false);
  const Icon = POWER_UP_ICONS[type];

  const handleAnimationEnd = () => {
    if (!isCollected) {
      onMiss(id);
    }
  };

  const handleClick = () => {
    if (!isCollected) {
      setIsCollected(true);
      onCollect(id, type);
    }
  };

  if (isCollected) {
    return null;
  }

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: `${xPosition}%`,
        bottom: "-10%",
        animation: isPaused ? 'none' : `float-up ${speed}s linear forwards`,
      }}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="relative w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform animate-pulse-glow">
        <Icon className="w-8 h-8 text-accent-foreground" />
      </div>
    </div>
  );
};
