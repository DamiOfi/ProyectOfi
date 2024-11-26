const { Client } = require('../db');

// Controlador para crear un nuevo cliente
const postClient = async (req, res) => {
  const {
    dni,            // DNI del cliente
    telefono,       // Teléfono del cliente
    nombre,         // Nombre del cliente
    apellido,       // Apellido del cliente
    localidad,      // Localidad del cliente
    direccion,      // Dirección del cliente
    enviarMsj = true, // Valor predeterminado para enviarMsj
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
