const { Vehicle } = require('../db');

// Controlador para actualizar un vehículo existente
const putVehicle = async (req, res) => {
  const { vehicleId } = req.params; // Obtenemos el ID del vehículo desde los parámetros de la ruta
  const {
    client_id,
    tipo,
    patente,
    compañia,
    cuota,
    cobertura,
    ultimo_pago,
    fecha_vencimiento,
    primer_pago,
    marca,
    modelo,
    año,
    precio_real,
    precio_agencia,
    local,
  } = req.body;

  try {
    // Verificar si el vehículo existe
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Actualizar los datos del vehículo
    await vehicle.update({
      client_id,
      tipo,
      patente,
      compañia,
      cuota,
      cobertura,
      ultimo_pago,
      fecha_vencimiento,
      primer_pago,
      marca,
      modelo,
      año,
      precio_real,
      precio_agencia,
      local,
    });

    res.status(200).json({
      message: 'Vehículo actualizado con éxito',
      vehiculo: vehicle.toJSON(),
    });
  } catch (error) {
    console.error('Error al actualizar el vehículo:', error);
    res.status(500).json({ error: 'Error al actualizar el vehículo' });
  }
};

module.exports = { putVehicle };