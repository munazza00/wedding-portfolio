import React from 'react';
import { useWedding } from '../context/WeddingContext';

export default function RoyalLogo({ size = "md", showNames = true }) {
  const { data } = useWedding();
  const groomInitial = (data?.hero?.groomName?.[0] || "A").toUpperCase();
  const brideInitial = (data?.hero?.brideName?.[0] || "M").toUpperCase();
  const monogram = data?.hero?.monogram || `${groomInitial} & ${brideInitial}`;

  const dimensions = size === "lg" ? "w-20 h-20" : size === "sm" ? "w-10 h-10" : "w-12 h-12";

  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      <div className={`relative ${dimensions} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
        
        {/* Animated Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-palette-coral-haze/30 via-palette-gold/25 to-palette-garden-green/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Intricate Royal SVG Crest */}
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 drop-shadow-md">
          <defs>
            <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E8B2" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#C49B7F" />
              <stop offset="100%" stopColor="#8B7355" />
            </linearGradient>

            <linearGradient id="coralGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-coral-haze)" />
              <stop offset="50%" stopColor="var(--color-gold)" />
              <stop offset="100%" stopColor="var(--color-garden-green)" />
            </linearGradient>
          </defs>

          {/* Outer Royal Crest Ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#royalGoldGrad)"
            strokeWidth="1.5"
            strokeDasharray="1.5 2"
          />

          <circle
            cx="50"
            cy="50"
            r="40"
            fill="rgba(255, 255, 255, 0.85)"
            stroke="url(#coralGreenGrad)"
            strokeWidth="1.2"
          />

          {/* Botanical Laurel Wreath Leaves */}
          <g fill="none" stroke="url(#royalGoldGrad)" strokeWidth="1.2" strokeLinecap="round">
            {/* Left Wreath Branch */}
            <path d="M22 62 C 16 50, 18 34, 30 22 C 34 26, 32 34, 25 38" />
            <path d="M25 50 C 20 42, 22 30, 32 26" />
            <path d="M27 64 C 23 58, 25 48, 33 46" />

            {/* Right Wreath Branch */}
            <path d="M78 62 C 84 50, 82 34, 70 22 C 66 26, 68 34, 75 38" />
            <path d="M75 50 C 80 42, 78 30, 68 26" />
            <path d="M73 64 C 77 58, 75 48, 67 46" />

            {/* Bottom Tie Ribbon */}
            <path d="M43 78 C 47 75, 53 75, 57 78 M47 78 L 44 87 M 53 78 L 56 87" />
          </g>

          {/* Top Royal Diadem / Crown */}
          <g fill="url(#royalGoldGrad)" stroke="var(--color-oxblood)" strokeWidth="0.5">
            <path d="M42 20 L 46 25 L 50 18 L 54 25 L 58 20 L 56 28 L 44 28 Z" />
            <circle cx="42" cy="19" r="1.5" fill="#E27D60" />
            <circle cx="50" cy="17" r="1.8" fill="#2D5A3E" />
            <circle cx="58" cy="19" r="1.5" fill="#E27D60" />
          </g>

          {/* Interlocking Monogram Initials */}
          <text
            x="50"
            y="56"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Cormorant Garamond', 'Cinzel', serif"
            fontSize="18"
            fontWeight="600"
            letterSpacing="0.05em"
            fill="var(--color-oxblood)"
            style={{ textShadow: '0 1px 2px rgba(139, 115, 85, 0.2)' }}
          >
            {monogram}
          </text>
        </svg>
      </div>

      {showNames && (
        <div className="flex flex-col">
          <span className="font-calligraphy text-2xl sm:text-3xl text-palette-oxblood group-hover:text-palette-coral-haze transition-colors leading-tight drop-shadow-xs">
            {data.hero.groomName} & {data.hero.brideName}
          </span>
          <span className="font-serif text-[10px] uppercase tracking-[0.25em] text-palette-garden-green font-semibold">
            Wedding Celebration
          </span>
        </div>
      )}
    </div>
  );
}
