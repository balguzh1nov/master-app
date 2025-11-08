import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#005BFF",
        secondary: "#6283B9",
        background: "#FFFFFF",
        text: "#1A1A1A",
        border: "#E5E5E5",
        gray: {
          50: "#F5F5F5",
          100: "#EEEEEE",
          200: "#E5E5E5",
          300: "#CCCCCC",
          400: "#999999",
          500: "#666666",
          600: "#333333",
        },
      },
    },
  },
  plugins: [],
};
export default config;

