/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#1E3A8A",
        accent: "#3B82F6",
        background: "#F3F4F6",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // ✅ Ensure this line is present
  ],
};
