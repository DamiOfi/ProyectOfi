const { Client, Car } = require('../db');

// Controlador para agregar vehículos a un cliente existente
const postCar = async (req, res) => {
  const { clientId, vehiculos } = req.body;

  try {
    // Validar que el cliente ID esté presente en la solicitud
    if (!clientId) {
      return res.status(400).json({ error: 'Debe proporcionar un clientId' });
    }

    // Verificar si el cliente existe en la base de datos
    const client = await Client.findByPk(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Validar que se envíen los datos de vehículos
    if (!vehiculos || !Array.isArray(vehiculos) || vehiculos.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un vehículo' });
    }

    // Crear los vehículos relacionados
    const cars = vehiculos.map((vehiculo) => ({
      ...vehiculo,
      client_id: clientId,
    }));

    const createdCars = await Car.bulkCreate(cars);

    res.status(201).json({
      message: 'Vehículos agregados con éxito',
      vehiculos: createdCars,
    });
  } catch (error) {
    console.error('Error al agregar vehículos:', error);
    res.status(500).json({ error: 'Error al agregar vehículos' });
  }
};

module.exports = { postCar };
