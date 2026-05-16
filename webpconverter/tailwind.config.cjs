module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        // Lavender-forward palette mapped onto the existing violet/indigo utility names.
        violet: {
          50: '#fbf8fd',
          100: '#f4eef9',
          200: '#e7dcf0',
          300: '#d7c1e4',
          400: '#be9fd3',
          500: '#a47bbf',
          600: '#8a63a7',
          700: '#70508a',
          800: '#5a406f',
          900: '#453152'
        },
        indigo: {
          50: '#f8f7fe',
          100: '#efebfb',
          200: '#ddd5f5',
          300: '#c6b8ec',
          400: '#ab94df',
          500: '#8f6fd1',
          600: '#7553bc',
          700: '#5e409b',
          800: '#4b327e',
          900: '#38265f'
        },
        // Custom palette colors - hardcoded hex values
        'lavender-grey': '#8e9aaf',
        thistle: '#cbc0d3',
        'soft-blush': '#efd3d7',
        'lavender-veil': '#feeafa',
        lavender: '#dee2ff'
      }
    }
  },
  plugins: []
}
