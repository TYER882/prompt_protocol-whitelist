import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
            "'IBM Plex Mono'",
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "monospace",
          ],
                kdam: [
                  '"Kdam Thmor Pro"', 
                  "monospace",
                ],

          ibm: [
            "'IBM Plex Mono'",
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "monospace",
          ],
        },
      colors: {
        protocol: {
          bg: "#00311f",
          panel: "#04111f",
          cyan: "#01140d",
          green: "#39ff88",
          muted: "#0a1311",
          line: "rgba(34, 211, 238, 0.28)",
        },
        terminal: {
          bg: "#01140d",
          panel: "rgba(1, 20, 13, 0.78)",
          border: "rgba(3, 97, 66, 0.452)",
          cyan: "#01140d",
          lime: "#A3E635",
          text: "#E5F7FF",
          muted: "#7FA6B8"
        }
      },
      boxShadow: {
        glow: "0 0 24px rgba(34, 211, 238, 0.16)",
        "glow-strong": "0 0 42px rgba(34, 211, 238, 0.24)"
      },
      backgroundImage: {
        "terminal-grid":
          "linear-gradient(rgba(34,211,238,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.08) 1px, transparent 1px)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        scan: "scan 6s linear infinite",
        blink: "blink 1s steps(2, start) infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;