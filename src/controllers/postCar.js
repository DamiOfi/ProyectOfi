const { Client, Car } = require('../db');

// Controlador para agregar un vehículo a un cliente existente
const postCar = async (req, res) => {
  const { clientId, patente, precio_agencia, compañia, modelo, ultimo_pago, cuota, cobertura, año, marca, local, fecha_vencimiento, primer_pago, precio_real } = req.body;

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

    // Validar los datos obligatorios del vehículo
    if (!patente || !precio_agencia || !compañia || !modelo || !cobertura || !año || !marca || !fecha_vencimiento || !precio_real) {
      return res.status(400).json({ error: 'Faltan datos obligatorios para crear el vehículo' });
    }

    // Crear el vehículo relacionado
    const car = await Car.create({
      client_id: clientId,
      patente,
      precio_agencia,
      compañia,
      modelo,
      ultimo_pago,
      cuota,
      cobertura,
      año,
      marca,
      local,
      fecha_vencimiento,
      primer_pago,
      precio_real,
    });

    res.status(201).json({
      message: 'Vehículo agregado con éxito',
      vehiculo: car,
    });
  } catch (error) {
    console.error('Error al agregar vehículo:', error);
    res.status(500).json({ error: 'Error al agregar vehículo' });
  }
};

module.exports = { postCar };
