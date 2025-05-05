const { pool } = require('../db.js');  // Reemplazamos 'import' por 'require'
const {
    getCategorias,
    getCategoria,
    patchCategorias,
    deleteCategorias,
    postCategorias,
} = require('../Models/categoria.model.js');

const obtenerCategorias = async (req, res) => {
    try {
        const rows = await getCategorias();
        res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error al obtener categorias' });
    }
};

const obtenerCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;
        console.log(categoria);
        const rows = await getCategoria(categoria);
        res.json(rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error al obtener categorias' });
    }
};

const actualizarCategorias = async (req, res) => {
    const { categoria } = req.params;
    const { descripcion1, nuevoNombre } = req.body;

    if (!nuevoNombre || !descripcion1) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    } else if (/^\s/.test(nuevoNombre || descripcion1)) {
        return res.status(400).json({ success: false, message: 'No se admiten espacios al principio' });
    } else if (nuevoNombre.length > 20 || descripcion1.length > 50) {
        return res.status(400).json({ success: false, message: 'El campo nombre no debe exceder de 50 caracteres' });
    }

    

    try {
        const result = await patchCategorias(categoria,descripcion1,nuevoNombre);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }

        res.status(200).json({ success: true, message: 'Categoría actualizada correctamente' });

    } catch (err) {
        console.error("Error en la consulta SQL: ", err);
        return res.status(500).json({ success: false, message: 'Error al actualizar la categoría', error: err.message });
    }
};

const borrarCategorias = async (req, res) => {
    const { categoria } = req.params;

    

    try {
        const result = await deleteCategorias(categoria);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Categoría no encontrada' });
        }
        return res.status(200).json({ success: true, message: 'Categoría eliminada correctamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error al eliminar la categoría' });
    }
};

const crearCategorias = async (req, res) => {
    const { categoria, descripcion } = req.body;

    if (!categoria || !descripcion) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    } else if (/^\s/.test(categoria) || /^\s/.test(descripcion)) {
        return res.status(400).json({ success: false, message: 'No se admiten espacios al principio en categoría o descripción' });
    } else if (!/^[a-zA-Z\s]+$/.test(categoria || descripcion)) {
        return res.status(400).json({ success: false, message: 'Digita solo letras en el nombre' });
    } else if (categoria.length > 20) {
        return res.status(400).json({ success: false, message: 'El campo nombre no debe exceder mas de 20 caracteres' });
    }

    
    try {
        const result = await postCategorias(categoria,descripcion);
        return res.status(200).json({ success: true, message: 'Registro exitoso' });
    } catch (err) {
        console.error(err);
        return res.status(505).json({ success: false, message: 'No puedes registrar una categoria ya previamente ingresada' });
    }
};



module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategorias,
    borrarCategorias,
    crearCategorias
};
