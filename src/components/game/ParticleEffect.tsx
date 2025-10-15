import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

interface ParticleEffectProps {
  x: number;
  y: number;
  color: string;
  onComplete: () => void;
}

export const ParticleEffect = ({ x, y, color, onComplete }: ParticleEffectProps) => {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x,
      y,
      color,
      velocityX: (Math.random() - 0.5) * 10,
      velocityY: (Math.random() - 0.5) * 10,
    }))
  );

  useEffect(() => {
    const timer = setTimeout(onComplete, 500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full animate-pop"
          style={{
            left: x,
            top: y,
            backgroundColor: color,
            transform: `translate(${particle.velocityX * 20}px, ${particle.velocityY * 20}px)`,
          }}
        />
      ))}
    </div>
  );
};
