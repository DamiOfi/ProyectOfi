const { Car } = require('../db');

// Controlador para eliminar un vehículo específico
const deleteCar = async (req, res) => {
  const { carId } = req.params; // ID del vehículo desde los parámetros

  try {
    // Verificar si el vehículo existe
    const car = await Car.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Eliminar el vehículo
    await car.destroy();

    res.status(200).json({ message: 'Vehículo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el vehículo:', error);
    res.status(500).json({ error: 'Error al eliminar el vehículo' });
  }
};

module.exports = { deleteCar };
