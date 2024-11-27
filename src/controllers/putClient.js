const { Client } = require('../db');

// Controlador para actualizar un cliente existente
const putClient = async (req, res) => {
  const { clientId } = req.params; // Obtenemos el ID del cliente desde los parámetros de la ruta
  const { dni, telefono, nombre, apellido, localidad, direccion, enviarMsj } = req.body;

  try {
    // Verificar si el cliente existe
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Actualizar los datos del cliente
    await client.update({
      dni,
      telefono,
      nombre,
      apellido,
      localidad,
      direccion,
      enviarMsj,
    });

    res.status(200).json({
      message: 'Cliente actualizado con éxito',
      cliente: client.toJSON(),
    });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = { putClient };
