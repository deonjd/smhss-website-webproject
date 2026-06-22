'use client';

import { ReactNode, useRef, useState } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = '',
  hover3D = true,
  glowColor = 'rgba(212, 168, 67, 0.15)',
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -10);
    setRotateY((x - 0.5) * 10);
    setGlowPosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group ${className}`}
    >
      {/* Mouse-following glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
