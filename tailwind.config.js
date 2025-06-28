/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      colors: {
        // Design system tokens
        primary: "#2E7D32", // Full opacity (100%)
        "primary-light": "rgba(46,125,50,0.15)", // 15% opacity (body bg)
        "primary-medium": "rgba(46,125,50,0.60)", // 60% opacity (dropdown bg/mobile)
        "primary-medium-solid": "#6FA978", // ≈ 40 % lysere enn primary, 100 % opak
        "primary-strong-solid": "#3E8F4A",
        "primary-strong": "rgba(46,125,50,0.85)", // 85% (stripe under navbar+ more)
        secondary: "#03A9F4",
        "neutral-light": "#F5F5F5",
        "neutral-dark": "#212121",
        error: "#D32F2F",
        placeholder: "#999999",
        "border-default": "#CCCCCC",
        "border-hover": "#AAAAAA",
        white: "#FFFFFF",
        black: "#000000",
      },
      borderRadius: {
        // Fra design systemet:
        card: "12px",
        badges: "12px",
        input: "15px",
        btn: "9999px",
      },
      boxShadow: {
        card: "0 4px 12px 0 rgba(0,0,8,0.25)", // Fra Figma-design: Y=4, blur=12, #000008, 25%
      },
      // SPACING:
      // XS: 4px (p-1)
      // S: 8px (p-2)
      // M: 16px (p-4)
      // L: 24px (p-6)
      // XL: 32px (p-8)
      // Spacing tokens i designsystemet (XS–XL, 4–32px) matcher nesten 1:1 med Tailwinds standardskala.
      // Derfor brukes Tailwinds innebygde spacing-klasser for all margin/padding.
      // Ved behov for avvik eller ekstra spacing, legges det inn per komponent i henhold til visuell balanse og responsivitet.
      // Eventuelle edge cases håndteres direkte i koden, ikke som custom tokens.
    },
  },
  plugins: [],
};
