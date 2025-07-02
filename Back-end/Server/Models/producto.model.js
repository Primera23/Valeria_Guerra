const { pool } = require('../db');

const getProductosDisponibles = async (categoria) => {
    let query = "SELECT * FROM producto WHERE estado = 1";
    const params = [];

    if (categoria && categoria !== 'Todos') {
        query += " AND id_categoria2 = ?";
        params.push(categoria);
    }

    const [productos] = await pool.query(query, params);
    return productos;
};

const getTallas = async () => {
    const [talla] = await pool.query("SELECT * FROM tallas");
    return talla;
};

const getProductos = async (categoria) => {
    let query = "SELECT * FROM producto";
    let params = [];
    
    if (categoria && categoria !== 'Todos') {
        query += " WHERE id_categoria2 = ?";
        params.push(categoria);
    }
    
    const [productos] = await pool.query(query, params);
    return productos;
};

const insertProducto = async ({ nombre, descripcion, precio, id_categoria2, url_imagen }) => {
    const [result] = await pool.query(
        'INSERT INTO producto(nombre, descripcion, precio, id_categoria2, url_imagen) VALUES (?, ?, ?, ?, ?)',
        [nombre, descripcion, precio, id_categoria2, url_imagen]
    );
    return result;
};

const insertColorTalla = async ({ id_producto2, talla2, color2, cantidad }) => {
    return await pool.query(
        'INSERT INTO producto_color_talla (id_producto2, talla2, color2, cantidad) VALUES (?, ?, ?, ?)',
        [id_producto2, talla2, color2, cantidad]
    );
    
};

const countUsers = async () => {
    const [results] = await pool.query('SELECT COUNT(*) AS total FROM usuario');
    return results[0].total;
};
const getProducto = async(id_producto)=>{
    const [productos] = await pool.query(`SELECT * FROM producto WHERE id_producto = ?`, [id_producto]);
    return productos;
}
const updateProducto = async ({ id, nombre, descripcion, precio, id_categoria2 }) => {
    const [result] = await pool.query(
        `UPDATE producto 
         SET nombre = ?, descripcion = ?, precio = ?, id_categoria2 = ?
         WHERE id_producto = ?`,
        [nombre, descripcion, precio, id_categoria2, id]
    );
    return result;
};


module.exports = {
    getTallas,
    getProductos,
    insertProducto,
    insertColorTalla,
    countUsers,
    getProducto,
    getProductosDisponibles, 
    updateProducto
};
