import React, { useState, useEffect, useRef } from 'react';

export default function LetterByLetterCalligraphy({
  groomName = "Aarav",
  brideName = "Meera",
  speed = 1.8,
  keyTrigger = 0
}) {
  const groomLetters = groomName.split('').map((char, i) => ({ char, word: 'groom', index: i }));
  const brideLetters = brideName.split('').map((char, i) => ({ char, word: 'bride', index: i }));

  const [activeStep, setActiveStep] = useState(0);
  const [activeCharProgress, setActiveCharProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const letterRefs = useRef({});
  const containerRef = useRef(null);

  // Soft organic inking sound
  const playInkingSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 250;
      filter.Q.value = 5.0;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(170 + Math.random() * 30, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.13);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // Audio permitted upon user gesture
    }
  };

  useEffect(() => {
    setIsDone(false);
    setActiveStep(0);
    setActiveCharProgress(0);

    // Sequence: Groom letters -> Ampersand -> Bride letters
    const totalChars = groomLetters.length + 1 + brideLetters.length;
    const totalDuration = speed * 1000;
    const charDuration = Math.max(totalDuration / totalChars, 130);

    let currentStep = 0;
    let charStart = null;
    let animId;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateChar = (timestamp) => {
      if (!charStart) charStart = timestamp;
      const elapsed = timestamp - charStart;
      const rawProgress = Math.min(elapsed / charDuration, 1);
      const easedProgress = easeOutCubic(rawProgress);

      setActiveCharProgress(easedProgress);

      if (rawProgress < 1) {
        animId = requestAnimationFrame(animateChar);
      } else {
        playInkingSound();
        charStart = null;
        currentStep++;
        setActiveStep(currentStep);
        setActiveCharProgress(0);

        if (currentStep < totalChars) {
          animId = requestAnimationFrame(animateChar);
        } else {
          setIsDone(true);
        }
      }
    };

    const startTimeout = setTimeout(() => {
      animId = requestAnimationFrame(animateChar);
    }, 280);

    return () => {
      clearTimeout(startTimeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [groomName, brideName, speed, keyTrigger]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none py-2 px-3 w-full max-w-5xl mx-auto"
    >
      {/* SINGLE-LINE CURSIVE EMBOSSED GOLD CALLIGRAPHY (MATCHING THE UPLOADED REFERENCE) */}
      <div className="flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 text-center">
        
        {/* Groom's Name Letters */}
        <div className="inline-flex items-baseline overflow-visible">
          {groomLetters.map((item, idx) => {
            const isCompleted = activeStep > idx;
            const isCurrent = activeStep === idx;
            const progress = isCompleted ? 1 : isCurrent ? activeCharProgress : 0;

            return (
              <span
                key={`groom_${idx}`}
                ref={el => (letterRefs.current[`groom_${idx}`] = el)}
                className="relative inline-block overflow-visible"
              >
                {/* Phantom layout letter */}
                <span className="opacity-0 font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight px-0.5">
                  {item.char}
                </span>

                {/* Embossed Golden/Bronze Metallic Calligraphy Letter */}
                <span
                  className="absolute inset-0 font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight whitespace-nowrap overflow-hidden px-0.5"
                  style={{
                    color: '#6B4716',
                    textShadow: `
                      0 1px 0 #D4AF37,
                      0 2px 0 #AA7C11,
                      0 3px 6px rgba(74, 46, 14, 0.5),
                      0 0 15px rgba(212, 175, 55, 0.4)
                    `,
                    WebkitMaskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 8, 100)}%)`,
                    maskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 8, 100)}%)`,
                    opacity: progress > 0 ? 1 : 0,
                  }}
                >
                  {item.char}
                </span>
              </span>
            );
          })}
        </div>

        {/* Ampersand (&) */}
        {(() => {
          const ampStepIndex = groomLetters.length;
          const isCompleted = activeStep > ampStepIndex;
          const isCurrent = activeStep === ampStepIndex;
          const progress = isCompleted ? 1 : isCurrent ? activeCharProgress : 0;

          return (
            <span
              ref={el => (letterRefs.current['amp'] = el)}
              className="relative inline-block overflow-visible mx-2 sm:mx-3 md:mx-4 self-baseline"
            >
              <span className="opacity-0 font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                &
              </span>
              <span
                className="absolute inset-0 flex items-baseline justify-center font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light overflow-hidden"
                style={{
                  color: '#8A5818',
                  textShadow: '0 2px 5px rgba(74, 46, 14, 0.4), 0 0 8px rgba(212, 175, 55, 0.3)',
                  WebkitMaskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 10, 100)}%)`,
                  maskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 10, 100)}%)`,
                  opacity: progress > 0 ? 1 : 0,
                  transform: `scale(${0.9 + progress * 0.1})`,
                }}
              >
                &
              </span>
            </span>
          );
        })()}

        {/* Bride's Name Letters */}
        <div className="inline-flex items-baseline overflow-visible">
          {brideLetters.map((item, idx) => {
            const stepIndex = groomLetters.length + 1 + idx;
            const isCompleted = activeStep > stepIndex;
            const isCurrent = activeStep === stepIndex;
            const progress = isCompleted ? 1 : isCurrent ? activeCharProgress : 0;

            return (
              <span
                key={`bride_${idx}`}
                ref={el => (letterRefs.current[`bride_${idx}`] = el)}
                className="relative inline-block overflow-visible"
              >
                <span className="opacity-0 font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight px-0.5">
                  {item.char}
                </span>

                <span
                  className="absolute inset-0 font-calligraphy text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight whitespace-nowrap overflow-hidden px-0.5"
                  style={{
                    color: '#6B4716',
                    textShadow: `
                      0 1px 0 #D4AF37,
                      0 2px 0 #AA7C11,
                      0 3px 6px rgba(74, 46, 14, 0.5),
                      0 0 15px rgba(212, 175, 55, 0.4)
                    `,
                    WebkitMaskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 8, 100)}%)`,
                    maskImage: `linear-gradient(to right, rgba(0,0,0,1) ${progress * 100}%, rgba(0,0,0,0) ${Math.min(progress * 100 + 8, 100)}%)`,
                    opacity: progress > 0 ? 1 : 0,
                  }}
                >
                  {item.char}
                </span>
              </span>
            );
          })}
        </div>

      </div>

      {/* Underline Calligraphy Flourish Ribbon */}
      <div className="w-64 sm:w-80 md:w-96 mt-4 overflow-hidden">
        <svg
          viewBox="0 0 400 36"
          className="w-full h-8 transition-all duration-1000 ease-out"
          style={{
            strokeDasharray: 400,
            strokeDashoffset: isDone ? 0 : 400,
            opacity: isDone ? 0.95 : 0,
          }}
        >
          <path
            d="M10 18 C 90 2, 140 34, 200 18 C 260 2, 310 34, 390 18"
            fill="none"
            stroke="url(#royalArchFlourishLandscape)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="200" cy="18" r="3.5" fill="#AA7C11" />
          <defs>
            <linearGradient id="royalArchFlourishLandscape" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#6B4716" />
              <stop offset="75%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
