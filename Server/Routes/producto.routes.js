import {Router} from 'express';
import {
    postProducto,
    getProducto,
    deleteProducto,
    getProductos,
    patchProducto
} from '../Controllers/producto.controller.js'

const router = Router();

router.post('/producto',postProducto);
  
router.get("/productos", getProductos);
router.get("/producto/:producto", getProducto);
  
router.delete('/producto/:producto',deleteProducto)
  
router.patch('/producto/:producto', patchProducto);

export default router;