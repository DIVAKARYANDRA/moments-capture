/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
  ink: "#081A2A",
  ink2: "#10263C",

  ivory: "#F8F8F8",
  ivory2: "#D7D7D7",

  gold: "#D4AF37",
  gold2: "#EBCB67",

  line: "#27415A",
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
