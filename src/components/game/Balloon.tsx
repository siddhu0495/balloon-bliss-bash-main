import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BalloonProps {
  id: string;
  color: string;
  onPop: (id: string) => void;
  onMiss: (id: string) => void;
  speed: number;
  xPosition: number;
}

export const Balloon = ({ id, color, onPop, onMiss, speed, xPosition }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isPopped) {
        onMiss(id);
      }
    }, speed * 1000);

    return () => clearTimeout(timer);
  }, [id, onMiss, speed, isPopped]);

  const handleClick = () => {
    if (!isPopped) {
      setIsPopped(true);
      onPop(id);
    }
  };

  if (isPopped) {
    return null;
  }

  const balloonColors: Record<string, string> = {
    red: "bg-[hsl(var(--balloon-red))]",
    blue: "bg-[hsl(var(--balloon-blue))]",
    green: "bg-[hsl(var(--balloon-green))]",
    yellow: "bg-[hsl(var(--balloon-yellow))]",
    purple: "bg-[hsl(var(--balloon-purple))]",
    orange: "bg-[hsl(var(--balloon-orange))]",
  };

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
      <div className="relative">
        {/* Balloon body */}
        <div
          className={cn(
            "w-16 h-20 rounded-full relative overflow-hidden shadow-lg transform hover:scale-110 transition-transform",
            balloonColors[color]
          )}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
          {/* Glossy highlight */}
          <div className="absolute top-2 left-3 w-6 h-8 bg-white/30 rounded-full blur-sm" />
        </div>
        {/* String */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-foreground/30" />
        {/* String end */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5rem] w-1 h-1 rounded-full bg-foreground/30" />
      </div>
    </div>
  );
};
