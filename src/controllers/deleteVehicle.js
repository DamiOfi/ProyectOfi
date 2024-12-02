const { Vehicle } = require('../db'); // Asegúrate de que la ruta sea correcta

// Controlador para eliminar un vehículo específico
const deleteVehicle = async (req, res) => {
  const { vehicleId } = req.params; // ID del vehículo desde los parámetros

  try {
    // Verificar si el vehículo existe
    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Eliminar el vehículo
    await vehicle.destroy();

    res.status(200).json({ message: 'Vehículo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};

module.exports = { deleteVehicle };
