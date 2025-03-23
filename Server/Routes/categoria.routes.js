const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const {
    postCategorias,
    getCategoria,
    deleteCategorias,
    getCategorias,
    patchCategorias
} = require('../Controllers/categoria.controller.js');  // Reemplazamos 'import' por 'require'

const router = Router();

// Rutas
router.post('/categoria', postCategorias);
router.get("/categorias", getCategorias);
router.get("/categoria/:categoria", getCategoria);
router.delete('/categoria/:categoria', deleteCategorias);
router.patch('/categoria/:categoria', patchCategorias);

// Exportar el router usando 'module.exports'
module.exports = router;
