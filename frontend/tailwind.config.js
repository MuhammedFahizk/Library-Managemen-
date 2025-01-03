export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f3f4f8",
        secondary: "#d2d4da",
        ternary: "#1ae8cd",
        // success: "#10B981", // Green
        // danger: "#EF4444", // Red
        // warning: "#F59E0B", // Yellow
        info: "#E3FEF7", 
        light: "#F3F4F6", // Light Gray
        dark: "#1F2937", // Dark Gray
      },
    },
  },
  plugins: [],
};
