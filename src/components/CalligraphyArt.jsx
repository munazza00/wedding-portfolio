import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function CalligraphyArt({
  groomName = "Aarav",
  brideName = "Meera",
  speed = 1.8,
  keyTrigger = 0
}) {
  const [phase, setPhase] = useState(0); // 1: groom, 2: ampersand, 3: bride, 4: complete
  const [isFinished, setIsFinished] = useState(false);
  const [progressGroom, setProgressGroom] = useState(0);
  const [progressAmp, setProgressAmp] = useState(0);
  const [progressBride, setProgressBride] = useState(0);

  // Soft Quill writing sound synthesis using Web Audio API
  const playQuillSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.value = 850;
      filter.Q.value = 3.0;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // Audio context may be restricted before user interaction
    }
  };

  useEffect(() => {
    setIsFinished(false);
    setProgressGroom(0);
    setProgressAmp(0);
    setProgressBride(0);
    setPhase(1);

    const groomDuration = speed * 1000 * 0.45;
    const ampDuration = speed * 1000 * 0.18;
    const brideDuration = speed * 1000 * 0.45;

    let start = null;
    let animFrame;

    const animateGroom = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / groomDuration, 1);
      setProgressGroom(p);
      if (Math.random() < 0.22) playQuillSound();

      if (p < 1) {
        animFrame = requestAnimationFrame(animateGroom);
      } else {
        start = null;
        setPhase(2);
        animFrame = requestAnimationFrame(animateAmp);
      }
    };

    const animateAmp = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / ampDuration, 1);
      setProgressAmp(p);

      if (p < 1) {
        animFrame = requestAnimationFrame(animateAmp);
      } else {
        start = null;
        setPhase(3);
        animFrame = requestAnimationFrame(animateBride);
      }
    };

    const animateBride = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / brideDuration, 1);
      setProgressBride(p);
      if (Math.random() < 0.22) playQuillSound();

      if (p < 1) {
        animFrame = requestAnimationFrame(animateBride);
      } else {
        setPhase(4);
        setIsFinished(true);
      }
    };

    animFrame = requestAnimationFrame(animateGroom);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [groomName, brideName, speed, keyTrigger]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      {/* Calligraphy Names Row */}
      <div className="relative flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 px-4 text-center">
        
        {/* Groom's Name */}
        <div className="relative inline-block overflow-visible">
          {/* Base invisible text to lock layout dimensions */}
          <span className="opacity-0 font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide px-3">
            {groomName}
          </span>

          {/* Reveal Layer */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden transition-all ease-out"
            style={{
              width: `${progressGroom * 100}%`,
              clipPath: `inset(0 ${100 - progressGroom * 100}% 0 0)`,
            }}
          >
            <span
              className="font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide px-3 whitespace-nowrap drop-shadow-sm"
              style={{
                color: 'var(--color-oxblood)',
                textShadow: '0 2px 14px rgba(92, 19, 31, 0.2), 0 0 20px rgba(226, 125, 96, 0.25)',
              }}
            >
              {groomName}
            </span>
          </div>
        </div>

        {/* Ampersand (&) */}
        <div className="relative inline-block overflow-visible my-1 md:my-0">
          <span className="opacity-0 font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-2">
            &
          </span>
          <div
            className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all ease-out"
            style={{
              opacity: progressAmp,
              transform: `scale(${0.7 + progressAmp * 0.3}) rotate(${(1 - progressAmp) * -20}deg)`,
            }}
          >
            <span
              className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-2 font-light drop-shadow-sm"
              style={{ color: 'var(--color-coral-haze)' }}
            >
              &
            </span>
          </div>
        </div>

        {/* Bride's Name */}
        <div className="relative inline-block overflow-visible">
          {/* Base invisible text */}
          <span className="opacity-0 font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide px-3">
            {brideName}
          </span>

          {/* Reveal Layer */}
          <div
            className="absolute inset-0 flex items-center overflow-hidden transition-all ease-out"
            style={{
              width: `${progressBride * 100}%`,
              clipPath: `inset(0 ${100 - progressBride * 100}% 0 0)`,
            }}
          >
            <span
              className="font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide px-3 whitespace-nowrap drop-shadow-sm"
              style={{
                color: 'var(--color-oxblood)',
                textShadow: '0 2px 14px rgba(92, 19, 31, 0.2), 0 0 20px rgba(226, 125, 96, 0.25)',
              }}
            >
              {brideName}
            </span>
          </div>
        </div>

      </div>

      {/* Decorative Calligraphy Flourish Ribbon */}
      <div className="w-72 sm:w-96 md:w-[32rem] mt-3 overflow-hidden">
        <svg
          viewBox="0 0 400 40"
          className="w-full h-9 transition-all duration-1000 ease-out"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: isFinished ? 0 : 400,
            opacity: isFinished ? 1 : 0,
          }}
        >
          <path
            d="M10 20 C 100 2, 140 38, 200 20 C 260 2, 300 38, 390 20"
            fill="none"
            stroke="url(#vibrantFlourishGrad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="200" cy="20" r="3.5" fill="var(--color-coral-haze)" />
          <circle cx="190" cy="20" r="1.5" fill="var(--color-gold)" />
          <circle cx="210" cy="20" r="1.5" fill="var(--color-gold)" />
          <defs>
            <linearGradient id="vibrantFlourishGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="var(--color-coral-haze)" />
              <stop offset="50%" stopColor="var(--color-gold)" />
              <stop offset="75%" stopColor="var(--color-garden-green)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
