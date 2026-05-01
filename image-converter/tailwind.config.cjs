module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        // Light purple palette (overrides default `violet` shades)
        violet: {
          50: '#fbf7ff',
          100: '#f6ecff',
          200: '#eed8ff',
          300: '#e5bfff',
          400: '#d59bff',
          500: '#c77bff',
          600: '#b164f0',
          700: '#8f46d6',
          800: '#6f2fb3',
          900: '#4e1a86'
        }
      }
    }
  },
  plugins: []
}
