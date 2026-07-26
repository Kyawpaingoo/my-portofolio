import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0d1117",
        surface: "#161b22",
        border: "#30363d",
        borderStrong: "#3a3f47",
        muted: "#8b949e",
        text: "#e6edf3",
        accent: {
          DEFAULT: "#2dd4bf",
          dim: "#0f766e",
        },
        success: "#3fb950",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(45,212,191,0.15) 1px, transparent 1px)",
      },
      backgroundSize: {
        "dot-grid": "24px 24px",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
