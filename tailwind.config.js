/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-cyan': '#00f2ff',
        'brand-orange': '#f4630f',
        'deep-blue': '#020617',
      },
    },
  },
  plugins: [],
}
