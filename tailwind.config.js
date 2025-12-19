/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'school-green': '#2e8b57',
        'school-blue': '#4169e1',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Desactivar reset CSS de Tailwind para no interferir con estilos existentes
  },
}
