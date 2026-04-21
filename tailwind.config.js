/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef4ff',
          100: '#d9e8ff',
          200: '#bcd4fe',
          300: '#8eb8fd',
          400: '#5a93fa',
          500: '#3b70f6',
          600: '#2550eb',
          700: '#1d3dd8',
          800: '#1e33af',
          900: '#1e308a',
          950: '#161f57',
        },
        surface: {
          0:   '#ffffff',
          50:  '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
        },
        ink: {
          900: '#0d1117',
          700: '#24292f',
          500: '#57606a',
          300: '#8c959f',
          100: '#d0d7de',
        },
        success: { 50: '#f0fdf4', 500: '#22c55e', 700: '#15803d' },
        warning: { 50: '#fffbeb', 500: '#f59e0b', 700: '#b45309' },
        danger:  { 50: '#fef2f2', 500: '#ef4444', 700: '#b91c1c' },
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'system-ui', 'sans-serif'],
        mono: ['"Cascadia Code"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      screens: {
        xs: '360px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'win-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'win-md': '0 4px 12px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
        'win-lg': '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        'win-xl': '0 20px 60px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease-out',
        'slide-up':   'slideUp 0.25s ease-out',
        'spin-slow':  'spin 1.2s linear infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseRing: {
          '0%':   { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(59,112,246,0.4)' },
          '70%':  { transform: 'scale(1)',    boxShadow: '0 0 0 8px rgba(59,112,246,0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(59,112,246,0)' },
        },
      },
    },
  },
  plugins: [],
};
