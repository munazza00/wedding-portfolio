import React from 'react';
import { useWedding } from '../context/WeddingContext';
import RoyalLogo from './RoyalLogo';
import { Heart, Sliders, Sparkles } from 'lucide-react';

export default function Footer() {
  const { data, setIsAdminOpen } = useWedding();

  return (
    <footer className="relative z-10 border-t border-palette-coral-haze/20 bg-gradient-to-b from-white/60 to-palette-powder-pink-light/80 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Monogram Crest Logo */}
        <div className="flex justify-center">
          <RoyalLogo size="md" showNames={false} />
        </div>

        {/* Names in Calligraphy */}
        <p className="font-calligraphy text-4xl sm:text-5xl text-palette-oxblood drop-shadow-xs">
          {data.hero.groomName} & {data.hero.brideName}
        </p>

        <p className="font-serif italic text-xs sm:text-sm text-palette-muted max-w-md mx-auto leading-relaxed">
          "Two lives, two hearts, joined together in friendship, united forever in love."
        </p>

        <div className="w-28 h-1 mx-auto divider-flourish" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-palette-muted pt-4 border-t border-palette-coral-haze/20 gap-3">
          <p className="font-serif">
            With eternal gratitude to our beloved families, artisans, and esteemed guests.
          </p>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-palette-coral-haze/40 text-palette-oxblood hover:text-palette-coral-haze font-serif text-xs uppercase tracking-wider font-semibold transition-all shadow-xs hover:shadow"
          >
            <Sliders className="w-3.5 h-3.5 text-palette-coral-haze" />
            <span>Customize Website (Admin Studio)</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
