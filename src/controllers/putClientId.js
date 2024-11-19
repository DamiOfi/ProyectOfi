const { Cliente } = require('../db');

// Controlador para actualizar un cliente por ID
const putClientId = async (req, res) => {
  const { id } = req.params; // ID del cliente a actualizar
  const dataToUpdate = req.body; // Datos a actualizar

  try {
    // Busca el cliente por ID
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Actualiza el cliente con los datos enviados en el cuerpo de la solicitud
    await cliente.update(dataToUpdate);

    res.status(200).json({
      message: 'Cliente actualizado con éxito',
      cliente: cliente.toJSON(),
    });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

module.exports = { putClientId };
