const { Car } = require('../db');

// Controlador para actualizar un vehículo existente
const putCar = async (req, res) => {
  const { carId } = req.params; // Obtenemos el ID del vehículo desde los parámetros de la ruta
  const { patente, precio_agencia, compañia, modelo, ultimo_pago, cuota, cobertura, año, marca, local, fecha_vencimiento, primer_pago, precio_real } = req.body;

  try {
    // Verificar si el vehículo existe
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Actualizar los datos del vehículo
    await car.update({
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

    res.status(200).json({
      message: 'Vehículo actualizado con éxito',
      vehiculo: car.toJSON(),
    });
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

module.exports = { putCar };
