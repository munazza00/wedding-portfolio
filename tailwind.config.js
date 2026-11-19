/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          'powder-pink': 'var(--color-powder-pink, #F7D6D0)',
          'powder-pink-light': 'var(--color-powder-pink-light, #FDF2F0)',
          'coral-haze': 'var(--color-coral-haze, #E27D60)',
          'coral-haze-dark': 'var(--color-coral-haze-dark, #C45F42)',
          'garden-green': 'var(--color-garden-green, #2D5A3E)',
          'garden-green-light': 'var(--color-garden-green-light, #4E7A5E)',
          'garden-green-pale': 'var(--color-garden-green-pale, #E8EFEA)',
          taupe: 'var(--color-taupe, #8B7355)',
          'taupe-light': 'var(--color-taupe-light, #C7B5A3)',
          'taupe-pale': 'var(--color-taupe-pale, #F4EFEB)',
          oxblood: 'var(--color-oxblood, #5C131F)',
          gold: 'var(--color-gold, #D4AF37)',
          'gold-light': 'var(--color-gold-light, #F3E5AB)',
          text: 'var(--color-text-main, #241A18)',
          muted: 'var(--color-text-muted, #6B554E)',
        }
      },
      fontFamily: {
        calligraphy: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'vibrant-glow': '0 20px 50px -12px rgba(226, 125, 96, 0.25), 0 0 25px 0 rgba(45, 90, 62, 0.15)',
        'coral-glow': '0 12px 30px -8px rgba(226, 125, 96, 0.35)',
        'green-glow': '0 12px 30px -8px rgba(45, 90, 62, 0.35)',
        'royal-inset': 'inset 0 2px 4px rgba(255, 255, 255, 0.6), 0 10px 30px rgba(92, 19, 31, 0.1)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'floatRev 9s ease-in-out infinite',
        'sway': 'sway 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer-fast': 'shimmer 3s linear infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-4deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(10px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
