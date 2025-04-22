const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const { 
    crearProducto,
    obtenerProductos,
    obtenerTallas,
    contarUsuarios
    // deleteCategorias,
    // getCategorias,
    // patchCategorias
} = require('../Controllers/producto.controller.js');
const multer = require('multer');
const path = require('path');
const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Asegúrate de que esta sea la carpeta correcta
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Extensión del archivo
      cb(null, Date.now() + ext); // Usa el timestamp para evitar conflictos de nombres
    }
  });

const upload = multer({ storage });

router.get('/tallas',obtenerTallas)
router.post('/producto',upload.single('Imagen'),crearProducto);
  
router.get("/productos",obtenerProductos);
router.get("/usuarios",contarUsuarios);
// router.get("/producto/:producto", getProducto);
  
// router.delete('/producto/:producto',deleteProducto)
  
// router.patch('/producto/:producto', patchProducto);

module.exports = router;