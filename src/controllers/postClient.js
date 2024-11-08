// src/controllers/clienteController.js
const { Cliente } = require('../db');

// Controlador para crear un nuevo cliente
const crearCliente = async (req, res) => {
  const { nombre, apellido, telefono, cuota, precio_real, precio_agencia, enviar_mensaje } = req.body;

  try {
    const cliente = await Cliente.create({
      nombre,
      apellido,
      telefono,
      cuota,
      precio_real,
      precio_agencia,
      enviar_mensaje,
    });

    res.status(201).json({
      message: 'Cliente creado con éxito',
      cliente: cliente.toJSON(),
      precioTotal: cliente.calcularPrecioTotal(),
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};
/* 
// Controlador para obtener todos los clientes
const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// Controlador para obtener un cliente por ID
const obtenerClientePorId = async (req, res) => {
  const clienteId = req.params.id;

  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
}; */

// Exportamos los controladores
module.exports = { crearCliente/* , obtenerClientes, obtenerClientePorId */ };
