import {Router} from 'express';
import {
    postCategorias,
    getCategoria,
    deleteCategorias,
    getCategorias,
    patchCategorias
} from '../Controllers/categoria.controller.js'

const router = Router();

router.post('/producto',postCategorias);
  
router.get("/productos", getCategorias);
router.get("/producto/:categoria", getCategoria);
  
router.delete('/producto/:categoria',deleteCategorias)
  
router.patch('/producto/:categoria', patchCategorias);

export default router;