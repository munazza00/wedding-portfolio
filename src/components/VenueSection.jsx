import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { MapPin, Clock, Navigation, Car, Sparkles, ExternalLink } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

export default function VenueSection() {
  const { data } = useWedding();
  const { venue } = data;
  const { ceremony, reception } = venue;

  return (
    <section id="venue" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-palette-powder-pink-light/30 to-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <AnimatedContent distance={50} direction="vertical" duration={0.8} ease="power3.out" className="text-center max-w-3xl mx-auto mb-16">
          <div>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-oxblood mb-4">
            {venue.sectionTitle || "Sacred Destination & Venues"}
          </h2>

          <div className="w-32 h-1 mx-auto divider-flourish mb-4" />

          <p className="font-sans text-sm sm:text-base text-palette-muted max-w-2xl mx-auto leading-relaxed">
            {venue.sectionSubtitle || "Where our sacred promises and grand celebrations unfold under starlit skies"}
          </p>
        </AnimatedContent>

        {/* Dual Venue Showcase */}
        <AnimatedContent
          distance={70}
          direction="vertical"
          duration={0.9}
          ease="power3.out"
          stagger={0.2}
          threshold={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
        >
          
          {/* 1. Wedding Ceremony Card */}
          <div className="vibrant-ombre-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={ceremony.image}
                alt={ceremony.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase font-bold bg-gradient-to-r from-palette-garden-green to-palette-coral-haze text-white shadow-md">
                  {ceremony.ritualName || "The Wedding Ceremony"}
                </span>
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
                  {ceremony.venueName}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between bg-white/95">
              <div className="space-y-4">
                <h4 className="font-serif text-2xl font-bold text-palette-oxblood">
                  {ceremony.title}
                </h4>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-palette-text">
                  <Clock className="w-5 h-5 text-palette-coral-haze flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif uppercase tracking-widest font-bold text-palette-oxblood text-xs block">
                      Ceremony Timing:
                    </span>
                    <span className="font-semibold text-sm">{ceremony.timing}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-palette-text">
                  <MapPin className="w-5 h-5 text-palette-garden-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif uppercase tracking-widest font-bold text-palette-oxblood text-xs block">
                      Setting & Atmosphere:
                    </span>
                    <p className="font-semibold text-palette-text leading-snug">
                      {ceremony.locationAddress}
                    </p>
                    <p className="text-xs text-palette-muted mt-1 leading-relaxed">
                      {ceremony.locationDetails}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-palette-coral-haze/20 text-xs text-palette-muted">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-palette-taupe flex-shrink-0" />
                    <span>{ceremony.parkingInfo || "Valet parking at heritage gate"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-palette-coral-haze flex-shrink-0" />
                    <span>{ceremony.attireNote || "Formal Regal Elegance"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(ceremony.venueName + " " + ceremony.locationAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-palette-garden-green via-palette-oxblood to-palette-coral-haze text-white font-serif text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-md hover:shadow-green-glow hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions & Map</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Grand Gala Reception Card */}
          <div className="vibrant-ombre-card overflow-hidden flex flex-col justify-between group">
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={reception.image}
                alt={reception.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase font-bold bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white shadow-md">
                  {reception.ritualName || "The Reception Gala"}
                </span>
              </div>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
                  {reception.venueName}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between bg-white/95">
              <div className="space-y-4">
                <h4 className="font-serif text-2xl font-bold text-palette-oxblood">
                  {reception.title}
                </h4>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-palette-text">
                  <Clock className="w-5 h-5 text-palette-coral-haze flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif uppercase tracking-widest font-bold text-palette-oxblood text-xs block">
                      Gala Timing:
                    </span>
                    <span className="font-semibold text-sm">{reception.timing}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs sm:text-sm text-palette-text">
                  <MapPin className="w-5 h-5 text-palette-garden-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-serif uppercase tracking-widest font-bold text-palette-oxblood text-xs block">
                      Setting & Atmosphere:
                    </span>
                    <p className="font-semibold text-palette-text leading-snug">
                      {reception.locationAddress}
                    </p>
                    <p className="text-xs text-palette-muted mt-1 leading-relaxed">
                      {reception.locationDetails}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-palette-coral-haze/20 text-xs text-palette-muted">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-palette-taupe flex-shrink-0" />
                    <span>{reception.parkingInfo || "Chauffeur buggy service"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-palette-coral-haze flex-shrink-0" />
                    <span>{reception.attireNote || "Evening Black Tie / Royal Luxe"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(reception.venueName + " " + reception.locationAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-taupe text-white font-serif text-sm tracking-widest uppercase font-bold transition-all duration-300 shadow-md hover:shadow-coral-glow hover:scale-[1.02]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions & Map</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          </div>

        </AnimatedContent>
      </div>
    </section>
  );
}
