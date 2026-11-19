import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Lock, Unlock, Sparkles, ChevronRight, Heart, KeyRound, ShieldCheck } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

export default function FamilyPicturesSection() {
  const { data, setIsFamilyModalOpen, isFamilyUnlocked } = useWedding();
  const familyAlbum = data.familyAlbum || data.gallery?.familyAlbum;

  return (
    <section id="family-archive" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Majestic Ombre Gateway Card */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.85}
          ease="power3.out"
          scale={0.97}
          className="vibrant-ombre-card p-8 sm:p-14 relative overflow-hidden bg-gradient-to-br from-white/95 via-palette-powder-pink-light/95 to-palette-taupe-pale/95 border-2 border-palette-coral-haze/40 shadow-vibrant-glow text-center"
        >
          
          {/* Silk Draping Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-palette-coral-haze via-[#D4AF37] to-palette-garden-green opacity-90" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Lock / Unlock Icon Emblem with Wax Seal Styling */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-br from-[#8C1D30] via-[#5C131F] to-[#380911] p-1 shadow-[0_10px_25px_rgba(92,19,31,0.45)] border-2 border-[#D4AF37]">
              <div className="w-full h-full rounded-full border border-dashed border-[#F3E5AB]/60 flex items-center justify-center bg-white/10 backdrop-blur-xs">
                {isFamilyUnlocked ? (
                  <Unlock className="w-9 h-9 text-[#F3E5AB] animate-bounce" />
                ) : (
                  <Lock className="w-9 h-9 text-[#F3E5AB] animate-pulse-glow" />
                )}
              </div>
            </div>
<div>
            
              

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-palette-oxblood tracking-tight">
                {familyAlbum?.title || "The Private Family Album"}
              </h2>

              <div className="w-28 h-1 mx-auto divider-flourish my-2" />

              <p className="font-sans text-xs sm:text-base text-palette-muted leading-relaxed max-w-xl mx-auto">
                {familyAlbum?.subtitle || "Intimate family portraits, generational blessings, and candid heirloom memories preserved in a private password-protected vault."}
              </p>
            </div>

            {/* Gateway Trigger Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsFamilyModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green text-white font-serif text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-coral-glow hover:scale-105 hover:shadow-xl border border-[#D4AF37]/50"
              >
                {isFamilyUnlocked ? (
                  <>
                    <ShieldCheck className="w-5 h-5 text-palette-powder-pink" />
                    <span>Open Unlocked Family Album</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5 text-palette-powder-pink" />
                    <span>Enter Passcode to Reveal Pictures</span>
                  </>
                )}
                <ChevronRight className="w-4 h-4 opacity-75" />
              </button>
            </div>

            {/* Passcode Note */}
            <div className="pt-2">
              <p className="text-xs text-palette-muted/90 italic flex items-center justify-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-palette-coral-haze fill-current" />
                <span>
                  {isFamilyUnlocked
                    ? "Album is currently unlocked for your session"
                    : "Passcode provided on family invitation card"}
                </span>
              </p>
            </div>

          </div>

        </AnimatedContent>

      </div>
    </section>
  );
}
