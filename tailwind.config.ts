/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0A0E18",
        midnightAlt: "#0E1520",
        parchment: "#F5EFE0",
        gold: {
          DEFAULT: "#C9A96E",
          hover: "#E8C97A"
        },
        oud: "#7D4E24",
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-gold': '0 0 18px rgba(201,169,110,0.55), 0 0 40px rgba(201,169,110,0.25)',
        'glow-gold-hover': '0 0 28px rgba(232,201,122,0.75), 0 0 60px rgba(232,201,122,0.35)',
      },
    },
  },
  plugins: [],
};
