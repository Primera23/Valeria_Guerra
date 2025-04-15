module.exports = {
  content: [
    './public/**/*.{html,js}',  // Ajusta para que Tailwind busque en la carpeta 'public'
    './node_modules/flowbite/**/*.js' // Asegúrate de incluir Flowbite
  ],
  theme: {
    extend: {colors: {
      'custom-green': '#159f8f',
    }},
    
  },
  plugins: [
    require('flowbite/plugin'), // Aquí se integra Flowbite
  ],
};
