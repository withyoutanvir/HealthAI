const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: "#E0F7FF",
        mint: "#C4F2E3",
        softBlue: "#D8ECFF",
        softGreen: "#E6F9F0",
        softPink: "#FFE8E8",
        glass: "rgba(255, 255, 255, 0.6)",
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        healthai: {
          primary: "#1E90FF",
          secondary: "#32CD32",
          accent: "#FFA07A",
          neutral: "#ffffff",
          "base-100": "#f2f2f2",
          info: "#93C5FD",
          success: "#6EE7B7",
          warning: "#FDE68A",
          error: "#FCA5A5",
        },
      },
    ],
  },
};
