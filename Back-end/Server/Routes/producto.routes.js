const { Router } = require('express');  // Reemplazamos 'import' por 'require'
const { 
    crearProducto,
    obtenerProductos,
    obtenerTallas,
    contarUsuarios,
    obtenerProducto,
    obtenerProductosDisponibles
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
router.get("/productos/:id_producto",obtenerProducto)
router.get("/productos-disponible", obtenerProductosDisponibles);
router.patch('/producto/visibilidad/:id_producto', async (req, res) => {
    const dbModule = require('../db');
    const pool = dbModule.pool;
    const { visible } = req.body;
    const { id_producto } = req.params;
    try {
        const estado = visible ? 1 : 0;
        await pool.query('UPDATE producto SET estado = ? WHERE id_producto = ?', [estado, id_producto]);
        res.json({ success: true, message: 'Visibilidad actualizada' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar visibilidad' });
    }
});

module.exports = router;