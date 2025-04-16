const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const { 
    postProducto,
    getProductos,
    getTallas,
    // deleteCategorias,
    // getCategorias,
    // patchCategorias
} = require('../Controllers/producto.controller.js');

const router = Router();

router.get('/tallas',getTallas)
router.post('/producto',postProducto);
  
router.get("/productos", getProductos);
// router.get("/producto/:producto", getProducto);
  
// router.delete('/producto/:producto',deleteProducto)
  
// router.patch('/producto/:producto', patchProducto);

module.exports = router;