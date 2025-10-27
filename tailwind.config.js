/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'],
      },
      boxShadow: {
        card: '0 12px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
        insetSoft: 'inset 0 6px 14px rgba(0,0,0,0.55)',
        neu: '4px 4px 10px rgba(0,0,0,0.45), inset 2px 2px 4px rgba(255,255,255,0.06)'
      },
      colors: {
        card: '#363C43',
        pill: '#171717',
        accent: '#6F787C'
      },
      borderRadius: {
        card: '18px',
        tile: '24px'
      }
    },
  },
  plugins: [],
};
