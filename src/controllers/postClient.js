const { Cliente } = require('../db');

// Controlador para crear un nuevo cliente
const postClient = async (req, res) => {
  const { nombre, apellido, telefono, cuota, precio_real, precio_agencia, enviar_mensaje } = req.body;

  try {
    const cliente = await Cliente.create({
      nombre,
      apellido,
      telefono,
      cuota,
      precio_real,
      precio_agencia,
      enviar_mensaje,
    });

    res.status(201).json({
      message: 'Cliente creado con éxito',
      cliente: cliente.toJSON(),
      precioTotal: cliente.calcularPrecioTotal(),
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Exportamos los controladores
module.exports = { postClient/* , obtenerClientes, obtenerClientePorId */ };
