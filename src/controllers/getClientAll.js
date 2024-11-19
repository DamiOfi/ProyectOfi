const { Cliente } = require('../db');

// Controlador para obtener todos los clientes
const getClientAll = async (req, res) => {
  try {
    const clientes = await Cliente.findAll(); // Busca todos los registros en la tabla "Cliente"
    res.status(200).json(clientes); // Devuelve los clientes como respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

module.exports = { getClientAll };