import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Calendar, Clock, MapPin, Sparkles, Shirt, Users, Heart } from 'lucide-react';
import AnimatedContent from './AnimatedContent';
import haldiImg from '../assets/images/prewedding-haldi.jpg';
import mehndiImg from '../assets/images/prewedding-mehndi.jpg';
import sangeetImg from '../assets/images/prewedding-sangeet.jpg';

const EVENT_IMAGE_MAP = {
  haldi: haldiImg,
  mehndi: mehndiImg,
  sangeet: sangeetImg,
};

const resolveEventImage = (event) => {
  if (event.id === 'haldi' || event.title?.toLowerCase().includes('haldi')) return EVENT_IMAGE_MAP.haldi;
  if (event.id === 'mehndi' || event.title?.toLowerCase().includes('mehndi')) return EVENT_IMAGE_MAP.mehndi;
  if (event.id === 'sangeet' || event.title?.toLowerCase().includes('sangeet')) return EVENT_IMAGE_MAP.sangeet;
  if (!event.image || event.image.includes('unsplash.com')) {
    return EVENT_IMAGE_MAP[event.id] || haldiImg;
  }
  return event.image;
};

export default function PreWeddingSection() {
  const { data } = useWedding();
  const { preWeddingEvents } = data;
  const [filterSide, setFilterSide] = useState('All');

  const filteredEvents = preWeddingEvents.filter(event => {
    if (filterSide === 'All') return true;
    if (filterSide === "Groom") return event.arrangedBy?.toLowerCase().includes('groom');
    if (filterSide === "Bride") return event.arrangedBy?.toLowerCase().includes('bride');
    if (filterSide === "Joint") return event.arrangedBy?.toLowerCase().includes('joint') || event.arrangedBy?.toLowerCase().includes('both');
    return true;
  });

  return (
    <section id="pre-wedding" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <AnimatedContent distance={50} direction="vertical" duration={0.8} ease="power3.out" className="text-center max-w-3xl mx-auto mb-16">
          <div>
            
             
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-palette-oxblood font-bold">
              
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-oxblood mb-4">
            Festive Gatherings & Sacred Rituals
          </h2>

          <div className="w-32 h-1 mx-auto divider-flourish mb-4" />

          <p className="font-sans text-sm sm:text-base text-palette-muted max-w-2xl mx-auto leading-relaxed">
            Every ritual is a celebration of joy, vibrant colors, and timeless family heritage. Discover the event themes, attire color palettes, and hosting families.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {['All', 'Bride', 'Groom', 'Joint'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterSide(filter)}
                className={`px-5 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all duration-300 shadow-sm ${
                  filterSide === filter
                    ? 'bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green text-white shadow-coral-glow scale-105 font-bold'
                    : 'bg-white/85 text-palette-muted hover:text-palette-oxblood border border-palette-taupe-light/60 hover:bg-white hover:border-palette-coral-haze'
                }`}
              >
                {filter === 'All' ? 'All Festivities' : filter === 'Joint' ? 'Joint Celebrations' : `${filter}'s Side`}
              </button>
            ))}
          </div>
        </AnimatedContent>

        {/* Festive Event Cards Grid */}
        <AnimatedContent
          distance={70}
          direction="vertical"
          duration={0.85}
          ease="power3.out"
          stagger={0.15}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {filteredEvents.map((event, idx) => {
            const isGroom = event.arrangedBy?.toLowerCase().includes('groom');
            const isBride = event.arrangedBy?.toLowerCase().includes('bride');

            return (
              <div
                key={event.id || idx}
                className="vibrant-ombre-card group flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl"
              >
                {/* Card Image Banner */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={resolveEventImage(event)}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  {/* Arranged By Host Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-serif font-semibold tracking-wide shadow-md backdrop-blur-md text-white ${
                        isGroom
                          ? 'bg-gradient-to-r from-[#D9822B] to-[#E59E38]'
                          : isBride
                          ? 'bg-gradient-to-r from-palette-coral-haze to-palette-oxblood'
                          : 'bg-gradient-to-r from-palette-garden-green to-palette-oxblood'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      {event.arrangedBy}
                    </span>
                  </div>

                  {/* Event Badge */}
                  {event.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest font-bold bg-white/90 text-palette-oxblood shadow-sm backdrop-blur-sm border border-palette-coral-haze/30">
                        {event.badge}
                      </span>
                    </div>
                  )}

                  {/* Subtitle / Calligraphy Tag on Banner */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <p className="font-calligraphy text-2xl sm:text-3xl text-palette-powder-pink drop-shadow-md">
                      {event.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content with Vibrant Detailing */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white/98 to-palette-powder-pink-light/70">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-palette-oxblood tracking-tight mb-2 group-hover:text-palette-coral-haze transition-colors">
                      {event.title}
                    </h3>

                    {/* Date, Timing & Location Details */}
                    <div className="space-y-2 text-xs text-palette-muted mb-4">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-palette-coral-haze flex-shrink-0" />
                        <span className="font-medium text-palette-text">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-palette-garden-green flex-shrink-0" />
                        <span className="font-medium text-palette-text">{event.time}</span>
                      </div>
                      {event.venueName && (
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-palette-taupe flex-shrink-0" />
                          <span className="font-semibold text-palette-oxblood">{event.venueName}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-palette-muted leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Theme & Dress Code Ombre Box */}
                  <div className="border-t border-palette-coral-haze/25 pt-4 space-y-3.5">
                    {/* Theme */}
                    <div className="flex items-start gap-2.5 text-xs">
                      <Sparkles className="w-4 h-4 text-palette-coral-haze flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif uppercase tracking-widest font-bold text-palette-oxblood text-[11px] block">
                          Event Theme:
                        </span>
                        <p className="text-palette-text font-semibold text-xs sm:text-sm">{event.theme}</p>
                      </div>
                    </div>

                    {/* Dress Code Color Palette Card */}
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-palette-powder-pink/80 via-white to-palette-garden-green-pale/60 border border-palette-taupe-light/50 shadow-xs">
                      <div className="flex items-center gap-2.5 text-xs">
                        <Shirt className="w-4 h-4 text-palette-garden-green" />
                        <div>
                          <span className="text-[10px] uppercase font-serif tracking-widest text-palette-muted font-bold block">
                            Dress Code Palette
                          </span>
                          <span className="text-xs font-bold text-palette-oxblood">
                            {event.dressCode}
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-7 h-7 rounded-full border-2 border-white shadow-md flex-shrink-0 transform group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: event.dressCodeColorHex || '#E27D60' }}
                        title={`Color: ${event.dressCode}`}
                      />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </AnimatedContent>
      </div>
    </section>
  );
}
