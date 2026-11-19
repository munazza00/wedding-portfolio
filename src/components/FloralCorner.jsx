import React from 'react';

export default function FloralCorner({ position = "top-left", className = "" }) {
  // SVG bouquet featuring deep burgundy peonies, blush roses, baby's breath, and draped silk
  const getTransforms = () => {
    switch (position) {
      case "top-right":
        return "scale-x-[-1]";
      case "bottom-left":
        return "scale-y-[-1]";
      case "bottom-right":
        return "scale-[-1]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`pointer-events-none select-none transition-transform duration-700 ${getTransforms()} ${className}`}
      style={{ filter: 'drop-shadow(0 8px 16px rgba(92, 19, 31, 0.15))' }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Deep Burgundy Peony Gradient */}
          <radialGradient id="burgundyPeony" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#8C1D30" />
            <stop offset="45%" stopColor="#5C131F" />
            <stop offset="85%" stopColor="#380911" />
            <stop offset="100%" stopColor="#220409" />
          </radialGradient>

          {/* Blush Powder Pink Rose Gradient */}
          <radialGradient id="blushRose" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2EE" />
            <stop offset="40%" stopColor="#F7D6D0" />
            <stop offset="80%" stopColor="#E2A69B" />
            <stop offset="100%" stopColor="#C47E72" />
          </radialGradient>

          {/* Draped Champagne Silk Gradient */}
          <linearGradient id="champagneSilk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FBF4EE" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#EADBCC" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#C5B19E" stopOpacity="0.6" />
          </linearGradient>

          {/* Garden Green Leaf Gradient */}
          <linearGradient id="darkGardenGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E6B4F" />
            <stop offset="60%" stopColor="#224731" />
            <stop offset="100%" stopColor="#152E1F" />
          </linearGradient>
        </defs>

        {/* 1. Draped Satin Silk Curve Wave */}
        <path
          d="M0 70 Q 40 50, 70 80 T 130 50 Q 150 20, 190 0 L 0 0 Z"
          fill="url(#champagneSilk)"
        />
        <path
          d="M10 50 Q 50 35, 80 65 T 140 35"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.6"
          fill="none"
        />

        {/* 2. Deep Garden Foliage Leaves */}
        <g fill="url(#darkGardenGreen)" stroke="#152E1F" strokeWidth="0.5">
          <path d="M45 45 C 30 25, 20 10, 45 5 C 60 15, 65 35, 45 45 Z" />
          <path d="M75 55 C 95 35, 115 35, 120 50 C 110 65, 90 70, 75 55 Z" />
          <path d="M25 85 C 10 95, 5 115, 20 125 C 35 120, 40 100, 25 85 Z" />
          <path d="M55 90 C 60 110, 80 120, 90 105 C 85 90, 70 80, 55 90 Z" />
        </g>

        {/* 3. Baby's Breath (Gypsophila) delicate white floral clusters */}
        <g fill="#FFFDF8" stroke="#E6DFC8" strokeWidth="0.4">
          <circle cx="85" cy="30" r="3" />
          <circle cx="92" cy="24" r="2.5" />
          <circle cx="98" cy="33" r="2" />
          <circle cx="106" cy="27" r="3" />
          <circle cx="114" cy="36" r="2.5" />
          <circle cx="122" cy="28" r="2" />
          
          <circle cx="28" cy="72" r="2.5" />
          <circle cx="20" cy="80" r="3" />
          <circle cx="34" cy="84" r="2" />
          <circle cx="26" cy="92" r="2.5" />

          {/* Tiny sprig stems */}
          <path d="M85 30 L 75 42 M 92 24 L 80 40 M 106 27 L 95 44" stroke="#224731" strokeWidth="0.6" />
        </g>

        {/* 4. Large Deep Burgundy Peony Flower (Main Accent) */}
        <g>
          {/* Outer Petals */}
          <circle cx="52" cy="52" r="28" fill="url(#burgundyPeony)" />
          <path d="M30 40 Q 52 20, 74 40 Q 80 65, 52 76 Q 25 65, 30 40 Z" fill="#5C131F" />
          <path d="M38 46 Q 52 30, 66 46 Q 72 62, 52 70 Q 32 62, 38 46 Z" fill="#751A28" />
          
          {/* Inner Layer Petals */}
          <path d="M44 48 Q 52 38, 60 48 Q 64 58, 52 64 Q 40 58, 44 48 Z" fill="#8C1D30" />
          <path d="M48 50 Q 52 44, 56 50 Q 58 56, 52 59 Q 46 56, 48 50 Z" fill="#A8283D" />
          <circle cx="52" cy="52" r="3" fill="#D4AF37" />
        </g>

        {/* 5. Delicate Blush Pink Rose Flower */}
        <g transform="translate(42, 60)">
          <circle cx="30" cy="30" r="20" fill="url(#blushRose)" />
          <path d="M16 24 Q 30 12, 44 24 Q 48 40, 30 46 Q 12 40, 16 24 Z" fill="#E2A69B" opacity="0.8" />
          <path d="M22 26 Q 30 18, 38 26 Q 42 36, 30 40 Q 18 36, 22 26 Z" fill="#F7D6D0" />
          <circle cx="30" cy="29" r="4" fill="#E27D60" opacity="0.7" />
        </g>

        {/* 6. Coral Astilbe Feathery Flower Sprigs */}
        <g stroke="#C45F42" strokeWidth="1.2" strokeLinecap="round">
          <path d="M70 70 L 105 105" />
          <path d="M80 80 L 88 74" />
          <path d="M86 86 L 94 80" />
          <path d="M92 92 L 100 86" />
          <path d="M98 98 L 106 92" />
        </g>
      </svg>
    </div>
  );
}
