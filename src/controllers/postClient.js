const { Client } = require('../db');

// Controlador para crear un nuevo cliente
const postClient = async (req, res) => {
  const {
    dni,            
    telefono,       
    nombre,         
    apellido,       
    localidad,      
    direccion,      
    enviarMsj = true, 
  } = req.body;

  try {
    // Crear el cliente
    const client = await Client.create({
      dni,
      telefono,
      nombre,
      apellido,
      localidad,
      direccion,
      enviarMsj,
    });

    res.status(201).json({
      message: 'Cliente creado con éxito',
      cliente: client.toJSON(),
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

module.exports = { postClient };
