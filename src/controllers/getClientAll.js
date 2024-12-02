const { Client, Vehicle } = require('../db'); // Asegúrate de que la ruta sea correcta

// Controlador para obtener todos los clientes junto con sus vehículos
const getClientAll = async (req, res) => {
  try {
    // Busca todos los registros en la tabla "Client" junto con sus vehículos relacionados
    const clients = await Client.findAll({
      include: [
        {
          model: Vehicle, // Relación con el modelo de vehículos
          attributes: [
            'id', 
            'tipo', 
            'patente', 
            'precio_agencia', 
            'compañia', 
            'modelo', 
            'ultimo_pago', 
            'cuota', 
            'cobertura', 
            'año', 
            'marca', 
            'local', 
            'fecha_vencimiento', 
            'primer_pago', 
            'precio_real'
          ], // Campos específicos a incluir de los vehículos
        },
      ],
    });

    res.status(200).json(clients); // Devuelve los clientes con vehículos en formato JSON
  } catch (error) {
    console.error('Error al obtener los clientes y sus vehículos:', error);
    res.status(500).json({ error: 'Error al obtener los clientes y sus vehículos' });
  }
};

module.exports = { getClientAll };
