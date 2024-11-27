const { Client, Car } = require('../db');

// Controlador para eliminar un cliente y todos sus vehículos
const deleteClient = async (req, res) => {
  const { clientId } = req.params; // ID del cliente desde los parámetros

  try {
    // Verificar si el cliente existe
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Eliminar los vehículos relacionados
    await Car.destroy({ where: { client_id: clientId } });

    // Eliminar el cliente
    await client.destroy();

    res.status(200).json({ message: 'Cliente y sus vehículos eliminados con éxito' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};

module.exports = { deleteClient };
