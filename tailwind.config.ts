import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 명세서 팔레트 (design/illustration-and-interaction-spec.md)
        rose: "#E8A6B8",
        sage: "#7BA6A1",
        cream: "#FBF7F4",
        ink: "#3A3A3A",
        warn: "#C0524B",
        info: "#5B7C99",
      },
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
