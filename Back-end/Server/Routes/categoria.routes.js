const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const {
    crearCategorias,
    obtenerCategoria,
    borrarCategorias,
    obtenerCategorias,
    actualizarCategorias
} = require('../Controllers/categoria.controller.js');  // Reemplazamos 'import' por 'require'

const router = Router();

// Rutas
router.post('/categoria', crearCategorias);
router.get("/categorias", obtenerCategorias);
router.get("/categoria/:categoria", obtenerCategoria);
router.delete('/categoria/:categoria', borrarCategorias);
router.patch('/categoria/:categoria', actualizarCategorias);

// Exportar el router usando 'module.exports'
module.exports = router;
