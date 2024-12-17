const { Client, Vehicle } = require('../db');

// Controlador para obtener un cliente por su ID
const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar cliente por ID incluyendo los vehículos asociados
    const client = await Client.findOne({
      where: { id }, // Condición: buscar por ID
      include: [
        {
          model: Vehicle, // Relación con el modelo de vehículos
          as: 'Vehicles', // Alias utilizado en la relación
        },
      ],
    });

    if (!client) {
      // Si el cliente no existe, retornar un error 404
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    // Enviar la información del cliente y sus vehículos
    return res.status(200).json(client);
  } catch (error) {
    console.error('Error al obtener el cliente:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getClientById };