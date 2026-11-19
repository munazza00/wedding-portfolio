import React from 'react';
import { useWedding } from '../context/WeddingContext';
import LetterByLetterCalligraphy from './LetterByLetterCalligraphy';
import { RotateCcw, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { data, calligraphyKey, replayCalligraphy } = useWedding();
  const { hero } = data;

  return (
    <section
      id="hero"
      className="relative h-screen min-h-screen w-full flex flex-col items-center justify-between overflow-hidden select-none bg-[#FAF3EE]"
    >
      {/* 1. FULL-SCREEN BACKGROUND MATCHING THE USER'S PROVIDED IMAGE */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/images/hero-widescreen-arch-clean.jpg"
          alt="Royal Palace Arch with Floral Blossom Canopy"
          className="w-full h-full object-cover object-top md:object-center filter brightness-[1.01] contrast-[1.02]"
          loading="eager"
        />
        {/* Soft natural lighting warmth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* 2. TOP SPACE TO ALLOW THE MAJESTIC ARCH DOME & PEACH BLOSSOMS TO SHINE */}
      <div className="relative z-20 pt-20 sm:pt-28 md:pt-36 w-full pointer-events-none" />

      {/* 3. CENTER OF ARCH: LETTER-BY-LETTER CALLIGRAPHY (Aarav & Meera on single line matching the user's image) */}
      <div className="relative z-20 w-full max-w-6xl px-4 sm:px-8 flex-1 flex flex-col items-center justify-center my-auto">
        <LetterByLetterCalligraphy
          groomName={hero.groomName}
          brideName={hero.brideName}
          speed={hero.calligraphySpeed || 1.8}
          keyTrigger={calligraphyKey}
        />
      </div>

      {/* 4. BOTTOM ACTIONS: REPLAY CALLIGRAPHY & SMOOTH SCROLL INDICATOR */}
      <div className="relative z-20 pb-8 sm:pb-12 md:pb-14 flex flex-col items-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            replayCalligraphy();
          }}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-serif tracking-widest uppercase font-bold text-white bg-gradient-to-r from-palette-coral-haze via-[#AA7C11] to-palette-coral-haze hover:opacity-95 shadow-[0_8px_25px_rgba(110,75,20,0.4)] hover:scale-105 transition-all duration-300 border border-[#D4AF37]/80"
          title="Replay letter-by-letter calligraphy handwriting"
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform duration-700 group-hover:-rotate-180 text-[#FFF2B2]" />
          <span>Replay Calligraphy</span>
        </button>

        {/* Scroll Indicator */}
        <a
          href="#pre-wedding"
          className="flex flex-col items-center gap-0.5 text-[#5C3D12] hover:text-[#AA7C11] transition-colors duration-300 group"
        >
          <span className="text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-serif font-bold drop-shadow-xs">
            The Celebrations
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#AA7C11] group-hover:text-palette-coral-haze" />
        </a>
      </div>

      {/* 5. SEAMLESS OMBRE GRADIENT WASH BLENDING INTO PRE-WEDDING SECTION */}
      <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 pointer-events-none z-10 bg-gradient-to-b from-transparent via-[#F7ECE8]/45 via-[#FDF7F4]/80 to-[#FDF7F4]" />

    </section>
  );
}
