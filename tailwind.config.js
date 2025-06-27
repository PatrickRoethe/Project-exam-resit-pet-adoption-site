/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        primary: "#2B7A2B",
        "primary-dark": "#226022",
        secondary: "#DDEAD9",
        accent: "#F5F5F5",
        error: "#D33C32",
        success: "#4CAF50",
        text: "#333333",
        label: "#222222",
        disabled: "#E4E4E4",
        white: "#FFFFFF",
        black: "#000000",
      },
      borderRadius: {
        lg: "12px",
        xl: "15px",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0,0,0,0.06)",
        button: "0 2px 4px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
