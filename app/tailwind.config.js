module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#673AB7', // Morado
        secondary: '#7E57C2', // Morado claro (más suave)
        success: '#4CAF50', // Verde
        warning: '#FF9800', // Naranja
        danger: '#F44336', // Rojo
        neutral: {
          100: '#F5F5F5', // Fondo Claro
          200: '#E0E0E0', // Bordes
          300: '#BDBDBD', // Gris Claro
          400: '#616161', // Gris Oscuro
          500: '#424242', // Gris Muy Oscuro
          600: '#212121', // Gris Muy Oscuro
        },
        white: '#FFFFFF', // Blanco
        black: '#000000', // Negro
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fuente personalizada
      },
    },
  },
  plugins: [require('@headlessui/tailwindcss')],
};
