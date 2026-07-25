/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
  ink: "#F7F3EE",
  ink2: "#EFE7DD",

  ivory: "#2E2522",
  ivory2: "#5A4E49",

  gold: "#C49A3A",
  gold2: "#DDBE76",

  line: "#D7C8B6",
},
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.35em",
      },
      maxWidth: {
        content: "1400px",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
