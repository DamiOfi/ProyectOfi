const { Cliente } = require('../db');

// Controlador para crear un nuevo cliente
const postClient = async (req, res) => {
  const {
    nombre,
    apellido,
    telefono,
    cuota,
    precio_real,
    precio_agencia,
    enviar_mensaje,
    patente,
    fecha_vencimiento,
    ultimo_pago,
    compania,
    cobertura,
  } = req.body;

  try {
    // Crear un nuevo cliente con los campos adicionales
    const cliente = await Cliente.create({
      nombre,
      apellido,
      telefono,
      cuota,
      precio_real,
      precio_agencia,
      enviar_mensaje,
      patente,
      fecha_vencimiento,
      ultimo_pago,
      compania,
      cobertura,
    });

    res.status(201).json({
      message: 'Cliente creado con éxito',
      cliente: cliente.toJSON(),
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Exportamos el controlador
module.exports = { postClient };
