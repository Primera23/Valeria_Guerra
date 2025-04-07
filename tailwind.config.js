module.exports = {
  content: [
    './public/**/*.{html,js}',  // Ajusta para que Tailwind busque en la carpeta 'public'
    './node_modules/flowbite/**/*.js' // Asegúrate de incluir Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Aquí se integra Flowbite
  ],
};
