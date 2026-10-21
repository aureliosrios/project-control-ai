/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'pcai-cyan': '#ffc20e',
        'pcai-orange': '#f4630f',
        'pcai-dark': '#14161a',
        // Paleta de obra: el acento "cyan" pasa a amarillo de seguridad,
        // "blue/indigo" a gris acero, "purple" a ladrillo y "slate" a asfalto/concreto.
        cyan: {
          50: '#fffbea', 100: '#fff3c4', 200: '#ffe98a', 300: '#ffd84d', 400: '#ffc20e',
          500: '#f5a800', 600: '#cc8500', 700: '#a16300', 800: '#7a4a05', 900: '#5c3a0a', 950: '#2b1f08',
        },
        blue: {
          50: '#f3f6f9', 100: '#e1e8ef', 200: '#c3d3e3', 300: '#a5b9ce', 400: '#8fafd0',
          500: '#6b8cae', 600: '#4b6a88', 700: '#3a536b', 800: '#2c4054', 900: '#22303f', 950: '#161e27',
        },
        indigo: {
          50: '#f5f5f4', 100: '#e7e5e4', 200: '#d6d3d1', 300: '#c0bbb6', 400: '#a8a29e',
          500: '#8a837d', 600: '#6e6862', 700: '#57524d', 800: '#403c38', 900: '#2c2926', 950: '#1c1a18',
        },
        purple: {
          50: '#fdf3ef', 100: '#fbe2d9', 200: '#f5c2b0', 300: '#ec9c82', 400: '#d9775f',
          500: '#b9553c', 600: '#9a432e', 700: '#7a3524', 800: '#5c281b', 900: '#431d14', 950: '#2a120c',
        },
        teal: {
          300: '#d9d27a', 400: '#c9bd3f', 500: '#a89d1c',
        },
        slate: {
          50: '#f7f7f6', 100: '#efeeec', 200: '#dddbd8', 300: '#c4c1bc', 400: '#9d9a95',
          500: '#76736f', 600: '#57554f', 700: '#3e3d3a', 800: '#2a2b2d', 900: '#1c1e21', 950: '#111315',
        },
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-cyan-500',
    'bg-orange-500',
    'bg-blue-500',
    'bg-indigo-500',
    'text-cyan-400',
    'text-orange-400',
    'text-blue-400',
    'text-indigo-400',
    'shadow-[0_0_30px_rgba(245,168,0,0.4)]',
    'shadow-[0_0_30px_rgba(244,99,15,0.4)]',
    'shadow-[0_0_30px_rgba(107,140,174,0.4)]',
  ]
}
