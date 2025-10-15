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
}

const POWER_UP_ICONS = {
  slowmo: Clock,
  extralife: Heart,
  doublescore: Star,
  multipop: Zap,
};

export const PowerUp = ({ id, type, onCollect, onMiss, speed, xPosition }: PowerUpProps) => {
  const [isCollected, setIsCollected] = useState(false);
  const Icon = POWER_UP_ICONS[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isCollected) {
        onMiss(id);
      }
    }, speed * 1000);

    return () => clearTimeout(timer);
  }, [id, onMiss, speed, isCollected]);

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
      className="absolute cursor-pointer animate-float-up"
      style={{
        left: `${xPosition}%`,
        bottom: "-10%",
        animationDuration: `${speed}s`,
      }}
      onClick={handleClick}
    >
      <div className="relative w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform animate-pulse-glow">
        <Icon className="w-8 h-8 text-accent-foreground" />
      </div>
    </div>
  );
};
