module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DBFF',
          300: '#8AC2FF',
          400: '#5CA9FF',
          500: '#2E90FF',
          600: '#0066CC',
          700: '#004B94',
          800: '#003161',
          900: '#001833',
        },
        secondary: {
          50: '#F5FFF7',
          100: '#EBFFEF',
          200: '#D1FFD9',
          300: '#A3FFB4',
          400: '#4CAF50',
          500: '#3E8E41',
          600: '#2F6B31',
          700: '#1F4821',
          800: '#102410',
          900: '#051205',
        },
        accent: {
          50: '#FFF5F2',
          100: '#FFE6E0',
          200: '#FFB3A0',
          300: '#FF8060',
          400: '#FF5722',
          500: '#EE3900',
          600: '#BB2D00',
          700: '#8A2100',
          800: '#591500',
          900: '#2B0A00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
