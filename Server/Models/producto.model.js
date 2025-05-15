const { pool } = require('../db');

const getTallas = async () => {
    const [talla] = await pool.query("SELECT * FROM tallas");
    return talla;
};

const getProductos = async () => {
    const [productos] = await pool.query("SELECT * FROM producto");
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

module.exports = {
    getTallas,
    getProductos,
    insertProducto,
    insertColorTalla,
    countUsers,
    getProducto
};
