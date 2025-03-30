import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Register Poppins as a font
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#606C38", // Main action buttons
          secondary: "#283618", // Secondary UI elements
          accent: "#DDA15E", // Call-to-action highlights
          neutral: "#FEFAE0", // Background color
          "base-100": "#FFFFFF", // White or light background for contrast
          info: "#BC6C25", // For alerts or extra elements
          success: "#81B622",
          warning: "#F4A261",
          error: "#E63946",
        },
      },
    ],
  },
};
