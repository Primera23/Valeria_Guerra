const { pool } = require('../db');

const getCategorias = async () => {
    const [rows] = await pool.query("SELECT * FROM `categoria` ORDER BY `categoria`.`Createt` ASC");
    return rows;
};

const getCategoria = async(categoria) => {
    
    const [rows] = await pool.query(`SELECT * FROM categoria WHERE categoria = ?`, [categoria]);
    return rows;
};

const patchCategorias = async (descripcion1,nuevoNombre,categoria) =>{

    const [result] = await pool.query('UPDATE categoria SET categoria = ?, descripcion = ? WHERE categoria = ?', [nuevoNombre, descripcion1, categoria]);
    return result;
}

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