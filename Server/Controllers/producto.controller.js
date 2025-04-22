const { pool } = require('../db.js');

const getTallas = async (req, res) => {
    try {
        const [talla] = await pool.query("SELECT * FROM tallas");
        res.json(talla); // Envía solo el array si es lo que necesitas
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
}

const getProductos = async (req, res) => {
    try {
        const [productos] = await pool.query("SELECT * FROM producto");
        res.json(productos); // Envía solo el array si es lo que necesitas
    } catch (err) {
        console.error(err);
        res.status(500).send('Error interno del servidor');
    }
};

const postProducto = async (req, res) => {
    // Para depuración

    try {
        const { categoria2, producto, precio, talla, color, descripcion2, cantidad } = req.body;
        const Imagen = req.file ? req.file.filename : null;

        const cantidadNum = Number(cantidad);

// Validar que sea entero

    
        if (!Imagen || !cantidad || !categoria2 || !precio || !talla || !color || !descripcion2 || !producto) {
                 return res.status(400).json({ result: false, message: 'Todos los campos son obligatorios' });
            }
        else if (categoria2 === 'Selecciona' ){
            return res.status(400).json({ result: false, message: 'Selecciona una categoria' });
        }
        else if (precio <= 1000){
            return res.status(400).json({ result: false, message: 'Precio tiene que ser mayor a 1000' });
        }
        if (isNaN(precio) ) {
            return res.status(400).json({ result: false, message: 'Precio debe ser números' });
        }
        
        else if (talla === 'Selecciona' ){
            return res.status(400).json({ result: false, message: 'Selecciona una talla' });
        }
        if (!Number.isInteger(cantidadNum)) {
            return res.status(400).json({ result: false, message: 'Cantidad debe ser un número entero' });
        }
        
        // Validar que sea positivo
        if (cantidadNum < 1) {
            return res.status(400).json({ result: false, message: 'Cantidad debe ser mayor a 0' });
        }
        
        // if ( isNaN(cantidad)) {
        //     return res.status(400).json({ result: false, message: 'Cantidad debe ser números' });
        // }
        console.log('Datos recibidos:', req.body);
        console.log('Archivo recibido:', req.file); 
        const [result] = await pool.query(
            'INSERT INTO producto(nombre, descripcion, precio, id_categoria2, url_imagen) VALUES(?, ?, ?, ?, ?)',
            [producto, descripcion2, precio, categoria2, Imagen]
        );

        await pool.query(
            'INSERT INTO producto_color_talla (id_producto2, talla2, color2, cantidad) VALUES (?, ?, ?, ?)',
            [result.insertId, talla, color, cantidad]
        );

        res.status(200).json({ success: true, message: 'Producto registrado' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: 'Error al registrar' });
    }
};

const countUsers = async (req, res) => {
    try {
        // Ejecutar consulta SQL para contar usuarios
        const [results] = await pool.query('SELECT COUNT(*) AS total FROM usuario');
        
        // Extraer el número total de usuarios
        const totalUsuarios = results[0].total;
        
        // Enviar respuesta
        res.status(200).json({
            success: true,
            totalUsuarios: totalUsuarios
        });
        
    } catch (error) {
        console.error('Error al contar usuarios:', error);
        res.status(500).json({
            success: false,
            message: 'Error al contar usuarios',
            error: error.message
        });
    }
};


// Exportamos como CommonJS
module.exports = { 
    postProducto, 
    getProductos,
    getTallas,
    countUsers
}
