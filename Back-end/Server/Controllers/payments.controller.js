const { pool } = require('../db');
const {
    countVentas,
    ventas
} = require('../Models/payments.model.js');

const tVendido = async (req, res) => {
  try {
    

    const totalVendido = await ventas();
   res.status(200).json({
            success: true,
            totalVendido: totalVendido
        });
  } catch (error) {
    console.error('Error al obtener el total vendido:', error);
    res.status(500).json({ error: 'Error al obtener el total vendido' });
  }
};

const ventasC = async (req, res) => {
    try {
        // Ejecutar consulta SQL para contar usuarios
        
        
        // Extraer el número total de usuarios
        const totalVentas = await countVentas();
        
        // Enviar respuesta
        res.status(200).json({
            success: true,
            totalUsuarios: totalVentas
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
module.exports = {
    tVendido, 
    ventasC
};