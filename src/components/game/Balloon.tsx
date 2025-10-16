import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface BalloonProps {
  id: string;
  color: string;
  type?: "normal" | "golden" | "bomb";
  onPop: (id: string, points?: number) => void;
  onMiss: (id: string) => void;
  speed: number;
  xPosition: number;
}

export const Balloon = ({ id, color, type = "normal", onPop, onMiss, speed, xPosition }: BalloonProps) => {
  const [isPopped, setIsPopped] = useState(false);

  const handleAnimationEnd = () => {
    if (!isPopped) {
      onMiss(id);
    }
  };

  const handleClick = () => {
    if (!isPopped) {
      setIsPopped(true);
      const points = type === "golden" ? 50 : type === "bomb" ? -20 : 10;
      onPop(id, points);
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
    pink: "bg-[hsl(var(--balloon-pink))]",
    cyan: "bg-[hsl(var(--balloon-cyan))]",
    gold: "bg-gradient-to-br from-[hsl(45,100%,60%)] to-[hsl(35,100%,50%)]",
    silver: "bg-[hsl(var(--balloon-silver))]",
  };

  const balloonStyle = type === "golden" ? "gold" : type === "bomb" ? "red" : color;

  return (
    <div
      id={id}
      className="absolute cursor-pointer animate-float-up"
      style={{
        left: `${xPosition}%`,
        bottom: "-10%",
        animationDuration: `${speed}s`,
      }}
      onClick={handleClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="relative">
        {/* Balloon body */}
        <div
          className={cn(
            "w-16 h-20 rounded-full relative overflow-hidden shadow-lg transform hover:scale-110 transition-transform",
            balloonColors[balloonStyle],
            type === "golden" && "animate-pulse-glow",
            type === "bomb" && "border-4 border-black"
          )}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent rounded-full" />
          {/* Glossy highlight */}
          <div className="absolute top-2 left-3 w-6 h-8 bg-white/30 rounded-full blur-sm" />
          {type === "bomb" && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">💣</div>
          )}
          {type === "golden" && (
            <div className="absolute inset-0 flex items-center justify-center text-2xl">⭐</div>
          )}
        </div>
        {/* String */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 bg-foreground/30" />
        {/* String end */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[5rem] w-1 h-1 rounded-full bg-foreground/30" />
      </div>
    </div>
  );
};
