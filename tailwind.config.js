/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        infinitica: {
          black: "#050505",
          violet: "#4B1D8F",
          purple: "#6A3FD6",
          accent: "#8B5CF6",
          lavender: "#C4A7F7",
          glow: "#EDE9FE",
        },
      },

      backgroundImage: {
        "infinitica-gradient":
          "linear-gradient(135deg, #4B1D8F, #6A3FD6, #8B5CF6, #C4A7F7)",
      },

      boxShadow: {
        infinitica: "0 0 40px rgba(139, 92, 246, 0.15)",
      },

      borderColor: {
        subtle: "rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
