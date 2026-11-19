import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Send, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import AnimatedContent from './AnimatedContent';

export default function GuestWishbook() {
  const { data, addGuestWish } = useWedding();
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    addGuestWish({
      name: name.trim(),
      relation: relation.trim() || 'Well-wisher & Friend',
      message: message.trim(),
    });

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#E27D60', '#2D5A3E', '#F7D6D0', '#8B7355', '#D4AF37'],
      });
    } catch (err) {
      console.log(err);
    }

    setName('');
    setRelation('');
    setMessage('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section id="wishes" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto">
        <AnimatedContent distance={50} direction="vertical" duration={0.8} ease="power3.out" className="text-center mb-14">
          <div>
            
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-palette-oxblood mb-2">
            Send a Toast to the Couple
          </h2>
          <div className="w-24 h-1 mx-auto divider-flourish my-3" />
          <p className="font-sans text-xs sm:text-sm text-palette-muted">
            Leave your warm blessings and personal wishes in our digital heirloom guestbook
          </p>
        </AnimatedContent>

        {/* Wish Form */}
        <AnimatedContent distance={60} direction="vertical" duration={0.85} ease="power3.out" className="vibrant-ombre-card p-6 sm:p-10 mb-12 bg-white/95">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-palette-oxblood mb-1.5 font-bold">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor & Lucas"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-palette-taupe-light/50 bg-white text-xs text-palette-text focus:outline-none focus:border-palette-coral-haze shadow-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-serif uppercase tracking-widest text-palette-oxblood mb-1.5 font-bold">
                  Relationship / Side
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bride's Cousin / Childhood Friend"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-palette-taupe-light/50 bg-white text-xs text-palette-text focus:outline-none focus:border-palette-coral-haze shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif uppercase tracking-widest text-palette-oxblood mb-1.5 font-bold">
                Your Blessing or Message *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write your heartfelt message for their journey together..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-palette-taupe-light/50 bg-white text-xs text-palette-text focus:outline-none focus:border-palette-coral-haze shadow-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {isSubmitted ? (
                <span className="text-xs text-palette-garden-green font-serif font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-palette-coral-haze" />
                  Your blessing has been lovingly recorded!
                </span>
              ) : <div />}

              <button
                type="submit"
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green hover:opacity-95 text-white font-serif text-xs tracking-widest uppercase font-bold transition-all shadow-md hover:shadow-coral-glow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Warm Wishes</span>
              </button>
            </div>
          </form>
        </AnimatedContent>

        {/* Recent Wishes List */}
        <AnimatedContent
          distance={50}
          direction="vertical"
          duration={0.8}
          stagger={0.1}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {(data.guestWishes || []).map((w, idx) => (
            <div
              key={w.id || idx}
              className="p-6 rounded-2xl bg-white/90 border border-palette-taupe-light/60 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <p className="text-xs sm:text-sm text-palette-text italic mb-4 leading-relaxed font-serif">
                "{w.message}"
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-palette-coral-haze/20 text-xs">
                <div>
                  <span className="font-serif font-bold text-palette-oxblood block">
                    {w.name}
                  </span>
                  <span className="text-palette-muted text-[11px]">{w.relation}</span>
                </div>
                <span className="text-palette-muted/80 text-[11px]">{w.date}</span>
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}
