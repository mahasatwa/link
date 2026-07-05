import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // STIE Dwimulya institutional colors
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#002147",
        },
        gold: {
          50: "#fdf8e8",
          100: "#f9edc4",
          200: "#f3db8a",
          300: "#edc94f",
          400: "#daa520",
          500: "#c4941a",
          600: "#a37714",
          700: "#7d5b10",
          800: "#5c420c",
          900: "#3d2c08",
        },
        // Semantic colors
        primary: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#002147",
        },
        accent: {
          50: "#fdf8e8",
          100: "#f9edc4",
          200: "#f3db8a",
          300: "#edc94f",
          400: "#daa520",
          500: "#c4941a",
          600: "#a37714",
          700: "#7d5b10",
          800: "#5c420c",
          900: "#3d2c08",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "headline": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title": ["1.5rem", { lineHeight: "1.3" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "caption": ["0.875rem", { lineHeight: "1.5" }],
        "small": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 33, 71, 0.07), 0 10px 20px -2px rgba(0, 33, 71, 0.04)",
        "medium": "0 4px 25px -5px rgba(0, 33, 71, 0.1), 0 10px 30px -5px rgba(0, 33, 71, 0.06)",
        "heavy": "0 10px 40px -10px rgba(0, 33, 71, 0.15), 0 20px 50px -10px rgba(0, 33, 71, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

