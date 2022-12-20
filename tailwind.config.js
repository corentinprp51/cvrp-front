// tailwind.config.js
module.exports = {
  content: [
    // Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': '#007BC1',
        'primary-text-color': '#494646',
        'main-background-color': '#FDFDFD'
      },
      dropShadow: {
        'classic': '0 4px 2px rgba(0,0,0,0.10)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
