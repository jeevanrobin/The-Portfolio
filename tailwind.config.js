/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        ink: "#e4e4e4",
        muted: "#5a5a5a",
        accent: "#4E85BF",
        "accent-light": "#89AACC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Instrument Serif", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: { container: "1200px" },
    },
  },
  plugins: [],
}
