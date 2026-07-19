/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FAF9F6',
          200: '#F5F3EE',
          300: '#EBE8E0',
        },
        sage: {
          50: '#F2F5F0',
          100: '#E4EAE0',
          200: '#C9D5C1',
          300: '#AEBFA2',
          400: '#8FA97E',
          500: '#6B8F5B',
          600: '#557347',
          700: '#3F5735',
          800: '#2A3B23',
          900: '#1A2816',
        },
        forest: {
          50: '#EEF2EE',
          100: '#D5DED5',
          200: '#AABDAA',
          300: '#7F9C7F',
          400: '#5A7E5A',
          500: '#3D6B3D',
          600: '#2E5A2E',
          700: '#1F4A1F',
          800: '#163816',
          900: '#0D260D',
        },
        collegiate: {
          orange: '#D4742C',
          blue: '#2C5F8A',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#444444',
          600: '#333333',
          700: '#252525',
          800: '#1C1C1C',
          900: '#141414',
          950: '#0D0D0D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
