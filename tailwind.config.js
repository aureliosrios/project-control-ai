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
        'pcai-cyan': '#00f2ff',
        'pcai-orange': '#f4630f',
        'pcai-dark': '#020617',
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
    'shadow-[0_0_30px_rgba(6,182,212,0.4)]',
    'shadow-[0_0_30px_rgba(244,99,15,0.4)]',
    'shadow-[0_0_30px_rgba(59,130,246,0.4)]',
  ]
}
