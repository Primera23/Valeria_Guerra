import {Router} from 'express';
import {
    postCategorias,
    getCategoria,
    deleteCategorias,
    getCategorias,
    patchCategorias
} from '../Controllers/categoria.controller.js'

const router = Router();

router.post('/categoria',postCategorias);
  
router.get("/categorias", getCategorias);
router.get("/categoria/:categoria", getCategoria);
  
router.delete('/categoria/:categoria',deleteCategorias)
  
router.patch('/categoria/:categoria', patchCategorias);

export default router;