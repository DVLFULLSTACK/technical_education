import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {


      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        galaxy: {
          light: "#a6bffd",
          primary: "#6b83f7",
          bright: "#c1c1ff",
          vibrant: "#d478f2",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
      },
      keyframes: {
        electric: {
          "0%": {
            transform: "rotate(0deg) scale(1)",
            opacity: "0.6",
          },
          "50%": {
            transform: "rotate(180deg) scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "rotate(360deg) scale(1)",
            opacity: "0.6",
          },
        },
        galaxySpin: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-150px) scale(1.2)", opacity: "0" },
        },
        'svg-filled': {
          '0%': { transform: 'scale(0)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1)', filter: 'brightness(1.5)' },
        },
        // Keyframe cho svg-celebrate
        'svg-celebrate': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '1', filter: 'brightness(1.5)' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      animation: {
        electric: "electric 12s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        galaxySpin: "galaxySpin 20s linear infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
        gradientMove: "gradientMove 8s linear infinite",
        float: "float 3s ease-in-out forwards",
        'svg-filled': 'svg-filled 1s ease-in-out',
        'svg-celebrate': 'svg-celebrate 0.5s forwards',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
