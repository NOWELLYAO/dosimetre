/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10181A",
        panel: "#182422",
        panel2: "#1E2C29",
        paper: "#EDEAE0",
        muted: "#8FA39A",
        line: "#2C3A36",
        copper: "#C9762B",
        copperLight: "#E6A15C",
        sage: "#7FA087",
        sageLight: "#A8C6AC",
        alert: "#D1553F",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(143,163,154,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(143,163,154,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "24px 24px",
      },
    },
  },
  plugins: [],
};
