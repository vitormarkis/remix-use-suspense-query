import type { Config } from "tailwindcss"

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "skeleton-to-right": "skeleton-to-right 1s infinite linear",
      },
      keyframes: {
        "skeleton-to-right": {
          "0%": {
            transform: "translateX(-500%) scaleY(500%) rotate(40deg)",
            filter: "blur(20px)",
          },
          "100%": {
            transform: "translateX(500%) scaleY(500%) rotate(40deg)",
            filter: "blur(20px)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
