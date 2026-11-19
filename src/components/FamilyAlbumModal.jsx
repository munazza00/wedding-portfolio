import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Lock, Unlock, X, KeyRound, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FamilyAlbumModal() {
  const {
    data,
    isFamilyModalOpen,
    setIsFamilyModalOpen,
    isFamilyUnlocked,
    setIsFamilyUnlocked,
  } = useWedding();

  const familyAlbum = data.familyAlbum || data.gallery?.familyAlbum || {};
  const [enteredPass, setEnteredPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  if (!isFamilyModalOpen) return null;

  const handleUnlock = (e) => {
    e.preventDefault();
    const correctPassword = familyAlbum.password || 'royal2025';
    if (enteredPass.trim().toLowerCase() === correctPassword.trim().toLowerCase()) {
      setIsFamilyUnlocked(true);
      setErrorMsg('');
      
      // Celebratory multi-color confetti burst
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#E27D60', '#2D5A3E', '#F7D6D0', '#8B7355', '#D4AF37', '#5C131F'],
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMsg('Incorrect passcode. Please check with the bride or groom.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleRelock = () => {
    setIsFamilyUnlocked(false);
    setEnteredPass('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF6F2] rounded-3xl shadow-2xl overflow-hidden border-2 border-palette-coral-haze/40 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-palette-taupe-light/40 bg-white/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-palette-coral-haze/15 flex items-center justify-center text-palette-coral-haze">
              {isFamilyUnlocked ? <Unlock className="w-5 h-5 text-palette-garden-green" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-palette-oxblood">
                {familyAlbum.title || "The Private Family Album"}
              </h3>
              <p className="text-[11px] text-palette-muted">
                {isFamilyUnlocked ? "Unlocked • Sacred Family Moments" : "Private Vault • Password Protected"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFamilyUnlocked && (
              <button
                onClick={handleRelock}
                className="text-xs font-serif px-3.5 py-1.5 rounded-full border border-palette-taupe-light text-palette-muted hover:text-palette-oxblood hover:border-palette-coral-haze transition-colors"
              >
                Lock Album
              </button>
            )}
            <button
              onClick={() => setIsFamilyModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/5 text-palette-muted hover:text-palette-oxblood transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {!isFamilyUnlocked ? (
            /* Password Input Gate Screen */
            <div className="max-w-md mx-auto text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-palette-coral-haze to-palette-powder-pink p-0.5 shadow-coral-glow">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-palette-oxblood">
                  <Lock className="w-8 h-8 text-palette-coral-haze animate-pulse" />
                </div>
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-palette-oxblood mb-2">
                  Heirloom Family Gate
                </h4>
                <p className="text-xs sm:text-sm text-palette-muted leading-relaxed">
                  This private archive contains intimate family blessings, generational keepsakes, and candid memories meant for immediate family and close relatives.
                </p>
              </div>

              <form onSubmit={handleUnlock} className={`space-y-4 ${isShaking ? 'animate-bounce' : ''}`}>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-palette-coral-haze" />
                  <input
                    type="password"
                    placeholder="Enter family passcode..."
                    value={enteredPass}
                    onChange={(e) => {
                      setEnteredPass(e.target.value);
                      setErrorMsg('');
                    }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border-2 border-palette-taupe-light/60 bg-white text-sm text-palette-text placeholder:text-palette-muted/60 focus:outline-none focus:border-palette-coral-haze transition-all shadow-xs"
                    autoFocus
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-palette-oxblood bg-palette-powder-pink/90 py-2.5 px-4 rounded-xl border border-palette-coral-haze/40 font-semibold">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-palette-coral-haze via-palette-oxblood to-palette-garden-green hover:opacity-95 text-white font-serif text-sm tracking-widest uppercase font-bold transition-all shadow-md hover:shadow-coral-glow flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Reveal Family Pictures</span>
                </button>

                {familyAlbum.hint && (
                  <div className="pt-2">
                    <p className="text-xs text-palette-muted/80 italic flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-palette-coral-haze" />
                      <span>{familyAlbum.hint}</span>
                    </p>
                  </div>
                )}
              </form>
            </div>
          ) : (
            /* Unlocked Family Gallery Content */
            <div className="space-y-8">
              {/* Congratulatory Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-palette-powder-pink-light via-white to-palette-garden-green-pale/50 border border-palette-coral-haze/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-palette-garden-green/15 flex items-center justify-center text-palette-garden-green flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-palette-garden-green" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-palette-oxblood">
                      Welcome to the Private Family Collection
                    </h4>
                    <p className="text-xs text-palette-muted">
                      Intimate moments and memories shared with love.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-palette-coral-haze font-serif italic">
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Reserved for loved ones</span>
                </div>
              </div>

              {/* Family Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(familyAlbum.privatePhotos || []).map((photo, i) => (
                  <div
                    key={photo.id || i}
                    onClick={() => setActivePhoto(photo)}
                    className="vibrant-ombre-card group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      {photo.date && (
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full text-[10px] font-serif uppercase tracking-wider font-bold bg-white/95 text-palette-oxblood shadow-sm">
                            {photo.date}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <p className="font-serif text-sm font-semibold text-palette-oxblood leading-snug">
                        {photo.caption}
                      </p>
                      <span className="text-[11px] text-palette-coral-haze font-serif mt-2 block italic">
                        Click to enlarge capture
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-palette-taupe-light/30 bg-white/80 text-center">
          <p className="font-serif text-xs text-palette-muted">
            Family moments are sacred. Please do not re-share without permission.
          </p>
        </div>

      </div>

      {/* Lightbox for single family photo */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div className="max-w-3xl w-full bg-neutral-900 rounded-3xl overflow-hidden p-3 text-center relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/60 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhoto.url}
              alt={activePhoto.caption}
              className="max-h-[75vh] w-auto mx-auto rounded-2xl object-contain"
            />
            <p className="text-white font-serif text-base mt-3">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
