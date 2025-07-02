const { pool } = require('../db');

const getCategorias = async () => {
    // Modificamos la consulta para obtener las categorías únicas de los productos
    const [rows] = await pool.query("SELECT* FROM categoria");
    return rows;
};

const getCategoria = async(categoria) => {
    
    const [rows] = await pool.query(`SELECT * FROM categoria WHERE categoria = ?`, [categoria]);
    return rows;
};

const patchCategorias = async (categoriaActual, nuevoNombre, nuevaDescripcion) => {
    const [result] = await pool.query(
        'UPDATE categoria SET categoria = ?, descripcion = ? WHERE categoria = ?',
        [nuevoNombre, nuevaDescripcion, categoriaActual]
    );
    return result;
};

const deleteCategorias = async(categoria)=>{
    const [result] = await pool.query('DELETE FROM categoria WHERE categoria = ?',[categoria]);
    return result;
}

const postCategorias = async(categoria,descripcion)=>{
    const [result] = await pool.query('INSERT INTO categoria(categoria, descripcion) VALUES(?, ?)',[categoria, descripcion]);
    return result; 
}
module.exports = {
    getCategorias,
    getCategoria,
    patchCategorias,
    deleteCategorias,
    postCategorias
};