/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        denim: {
          50: "#f5faff",
          100: "#e8f2ff",
          200: "#bfd4ff",
          300: "#95b6ff",
          400: "#4d7bff",
          500: "#0040ff",
          600: "#0038e6",
          700: "#002b99",
          800: "#002266",
          900: "#001a4d",
        },
        sky: {
          50: "#f4f9fc",
          100: "#eaf2ff",
          200: "#c7e0ff",
          300: "#a4ceff",
          400: "#5fb0ff",
          500: "#1a91ff",
          600: "#1782e6",
          700: "#105b99",
          800: "#0c4773",
          900: "#093b5c",
        },
      },
    },
  },
  plugins: [],
};
