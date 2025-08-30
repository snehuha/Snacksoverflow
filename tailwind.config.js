module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./popup.html"],
  theme: { 
    extend: {} 
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
