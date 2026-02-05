/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          dark: '#0a0a0a',
          darker: '#1a1a1a',
          gray: '#2d2d2d',
          'gray-light': '#3a3a3a',
        },
        mystic: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      animation: {
        'firefly-float': 'firefly-float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'firefly-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(45, 212, 191, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(45, 212, 191, 0.8)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}
