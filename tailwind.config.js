/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#12121a',
          700: '#1c1b26',
          600: '#2a2838',
        },
        gold: {
          300: '#ffe29a',
          400: '#ffd066',
          500: '#dfa248',
          600: '#c2852b',
          700: '#8e5e18',
        },
        flame: {
          400: '#ff7e47',
          500: '#ff5419',
          600: '#e63900',
          700: '#b82700',
        },
        champagne: {
          100: '#faf8f5',
          200: '#f3ede2',
          300: '#e5dac8',
          400: '#c5b8a5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle at center, transparent 40%, rgba(5,5,7,0.85) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #ffe29a 0%, #dfa248 50%, #c2852b 100%)',
        'flame-gradient': 'linear-gradient(135deg, #ffd066 0%, #ff5419 60%, #b82700 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
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
