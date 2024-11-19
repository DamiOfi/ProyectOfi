const { Cliente } = require('../db');

// Controlador para eliminar un cliente por ID
const deleteClientId = async (req, res) => {
  const { id } = req.params; // ID del cliente a eliminar

  try {
    // Verifica si el cliente existe
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    // Elimina el cliente
    await cliente.destroy();

    res.status(200).json({
      message: `Cliente con ID ${id} eliminado con éxito`,
    });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};

module.exports = { deleteClientId };
