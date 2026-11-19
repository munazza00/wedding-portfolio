import React from 'react';

export default function MotionBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Smooth, subtle ambient ombre glow orbs (No leaves, no roses — clean luxury depth) */}
      <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-palette-coral-haze/15 via-palette-powder-pink/20 to-transparent blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-palette-garden-green/10 via-palette-taupe-light/20 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '2.5s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-gradient-to-tr from-palette-powder-pink/25 via-palette-coral-haze/10 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '5s' }} />
    </div>
  );
}
