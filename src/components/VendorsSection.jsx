import React from 'react';
import { useWedding } from '../context/WeddingContext';
import { Award, ExternalLink, Sparkles, HeartHandshake } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

export default function VendorsSection() {
  const { data } = useWedding();
  const { vendors } = data;
  const list = vendors?.list || [];

  return (
    <section id="artisans" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-transparent via-palette-powder-pink-light/30 to-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <AnimatedContent distance={50} direction="vertical" duration={0.8} ease="power3.out" className="text-center max-w-3xl mx-auto mb-16">
          <div>
            
            <span className="text-xs uppercase tracking-[0.25em] font-serif text-palette-oxblood font-bold">
            
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-oxblood mb-4">
            {vendors.sectionTitle || "Our Wedding Artisans & Managers"}
          </h2>

          <div className="w-32 h-1 mx-auto divider-flourish mb-4" />

          <p className="font-sans text-sm sm:text-base text-palette-muted max-w-2xl mx-auto leading-relaxed">
            {vendors.sectionSubtitle || "The visionary planners, chefs, scenographers, and artists who brought our dream celebrations to life"}
          </p>
        </AnimatedContent>

        {/* Vendors Grid */}
        <AnimatedContent
          distance={60}
          direction="vertical"
          duration={0.85}
          ease="power3.out"
          stagger={0.12}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {list.map((vendor, index) => (
            <div
              key={vendor.id || index}
              className="vibrant-ombre-card p-7 flex flex-col justify-between group bg-white/95"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif uppercase tracking-widest text-palette-oxblood font-bold bg-gradient-to-r from-palette-powder-pink to-palette-powder-pink-light px-3.5 py-1 rounded-full border border-palette-coral-haze/30 shadow-xs">
                    {vendor.category}
                  </span>
                  <Award className="w-4 h-4 text-palette-garden-green opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-palette-oxblood tracking-tight mb-1 group-hover:text-palette-coral-haze transition-colors">
                  {vendor.companyName}
                </h3>
                {vendor.leadName && (
                  <p className="text-xs font-serif italic text-palette-muted mb-3 font-medium">
                    Led by {vendor.leadName}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-palette-muted leading-relaxed mb-6">
                  {vendor.notes}
                </p>
              </div>

              <div className="pt-4 border-t border-palette-coral-haze/20 flex items-center justify-between text-xs">
                {vendor.instagram && (
                  <a
                    href={`https://instagram.com/${vendor.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-palette-oxblood hover:text-palette-coral-haze font-semibold transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-palette-coral-haze" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>{vendor.instagram}</span>
                  </a>
                )}

                {vendor.website && (
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-palette-muted hover:text-palette-oxblood transition-colors ml-auto font-medium"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
