const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const path = require('path');  // Reemplazamos 'import' por 'require'  // Reemplazamos 'import' por 'require'
const { dirname } = require('path');  // Reemplazamos 'import' por 'require'

const router = Router();

// Obtener __filename y __dirname




router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));  // Ruta al archivo 'index.html'
});

// Exportar el router usando module.exports
module.exports = router;

