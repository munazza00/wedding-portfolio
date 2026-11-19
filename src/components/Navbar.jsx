import React, { useState, useEffect } from 'react';
import { useWedding } from '../context/WeddingContext';
import RoyalLogo from './RoyalLogo';
import { Sliders, Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data, setIsAdminOpen } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ambient Gentle Melody Synthesizer (pentatonic harp/chime tones)
  const toggleAmbientSound = () => {
    if (isPlayingAudio) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        setAudioCtx(ctx);
        setIsPlayingAudio(true);

        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
        let step = 0;
        const interval = setInterval(() => {
          if (ctx.state === 'closed') {
            clearInterval(interval);
            return;
          }
          const note = notes[step % notes.length];
          step += Math.floor(Math.random() * 3) + 1;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);
          
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 3.0);
        }, 1600);

      } catch (e) {
        console.error(e);
      }
    }
  };

  const navLinks = [
    { name: 'Festivities', href: '#pre-wedding' },
    { name: 'Venues', href: '#venue' },
    { name: 'Family Archive', href: '#family-archive' },
    { name: 'Artisans', href: '#artisans' },
    { name: 'Blessings', href: '#wishes' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-palette-coral-haze/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Fixed Royal Logo Crest */}
        <a href="#hero">
          <RoyalLogo size="sm" showNames={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.22em] font-serif font-bold text-palette-muted hover:text-palette-oxblood transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-palette-coral-haze after:to-palette-garden-green hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls: Ambient Audio & Admin Studio */}
        <div className="flex items-center gap-3">
          {/* Ambient Music Toggle */}
          <button
            onClick={toggleAmbientSound}
            className={`p-2.5 rounded-full border transition-all ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-palette-powder-pink to-palette-coral-haze/40 border-palette-coral-haze text-palette-oxblood shadow-sm animate-pulse-glow'
                : 'border-palette-taupe-light/60 text-palette-muted hover:text-palette-oxblood bg-white/80'
            }`}
            title={isPlayingAudio ? "Mute Ambient Soundtrack" : "Play Ambient Soundtrack"}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 text-palette-oxblood" />
            ) : (
              <VolumeX className="w-4 h-4 text-palette-muted" />
            )}
          </button>

          {/* Backoffice Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white font-serif text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:shadow-coral-glow hover:scale-105"
            title="Open Palace Backoffice (/backoffice)"
          >
            <Sliders className="w-3.5 h-3.5 text-palette-powder-pink" />
            <span className="hidden sm:inline">Backoffice</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-palette-oxblood rounded-xl hover:bg-black/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-palette-coral-haze/30 px-6 py-6 space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-serif uppercase tracking-wider font-bold text-palette-oxblood hover:text-palette-coral-haze"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-palette-taupe-light/40">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-palette-coral-haze to-palette-oxblood text-white font-serif text-xs uppercase tracking-wider font-bold shadow-md"
            >
              <Sliders className="w-4 h-4" />
              <span>Palace Backoffice (/backoffice)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
