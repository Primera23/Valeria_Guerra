const {
    getTallas,
    getProductos,
    insertProducto,
    insertColorTalla,
    countUsers,
    getProducto,
    getProductosDisponibles
} = require('../Models/producto.model.js');

const obtenerProductosDisponibles = async (req, res) => {
    try {
        const categoria = req.query.categoria;
        const productos = await getProductosDisponibles(categoria);

        // Filtrar productos con cantidad > 0
        
        
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos disponibles:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos disponibles',
            error: error.message
        });
    }
};

const obtenerTallas = async (req, res) => {
    try {
        const talla = await getTallas();
        res.json(talla); // Envía solo el array si es lo que necesitas
    } catch (err) {
        console.error('Error al obtener tallas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tallas',
            error: error.message
        });
    }
    
}

const obtenerProductos = async (req, res) => {
    try {
        const categoria = req.query.categoria; // Obtiene el parámetro de consulta
        const productos = await getProductos(categoria); // Pasa la categoría a la función
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
};

const obtenerProducto = async (req, res) => {
    const { id_producto } = req.params;
    console.log(id_producto)
    try {
        const productos = await getProducto(id_producto);
        res.json(productos[0]); // Envía solo el array si es lo que necesitas
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener productos',
            error: error.message
        });
    }
    
};

const crearProducto = async (req, res) => {
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
        const result = await insertProducto({
            nombre:producto,
            descripcion:descripcion2,
            precio,
            id_categoria2:categoria2,
            url_imagen:Imagen
        });

        await insertColorTalla({
            id_producto2:result.insertId,
            talla2:talla,
            color2: color,
            cantidad
        })
            
        

        res.status(200).json({ success: true, message: 'Producto registrado' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: 'Error al registrar' });
    }
};

const contarUsuarios = async (req, res) => {
    try {
        // Ejecutar consulta SQL para contar usuarios
        
        
        // Extraer el número total de usuarios
        const totalUsuarios = await countUsers();
        
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
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, id_categoria2 } = req.body;

        if (!nombre || !descripcion || !precio || !id_categoria2) {
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
        }

        // Aquí llamas a tu modelo (debes tener una función tipo updateProducto)
        const resultado = await require('../Models/producto.model.js').updateProducto({
            id,
            nombre,
            descripcion,
            precio,
            id_categoria2: id_categoria2
        });

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }

        res.json({ success: true, message: 'Producto actualizado correctamente' });

    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar producto',
            error: error.message
        });
    }
};


// Exportamos como CommonJS
module.exports = { 
    crearProducto, 
    obtenerProductos,
    obtenerTallas,
    contarUsuarios,
    obtenerProducto,
    obtenerProductosDisponibles, 
    actualizarProducto
}
