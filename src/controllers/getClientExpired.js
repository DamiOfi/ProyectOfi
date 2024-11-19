const { Cliente } = require('../db');

// Función para remover la parte de la hora de una fecha
const removeTimeFromDate = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0); // Establecer la hora en 00:00:00 para comparar solo la fecha
  return newDate;
};

// Controlador para obtener clientes que vencen hoy y en tres días
const getClientExpired = async (req, res) => {
  try {
    // Obtener las fechas necesarias
    const today = removeTimeFromDate(new Date());
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 3);

    // Consultar en la base de datos
    const clients = await Cliente.findAll();

    // Filtrar los clientes que vencen hoy
    const clientsDueToday = clients.filter(client => {
      const dueDate = removeTimeFromDate(client.fecha_vencimiento);
      return dueDate.getTime() === today.getTime();
    });

    // Filtrar los clientes que vencen en tres días
    const clientsDueInThreeDays = clients.filter(client => {
      const dueDate = removeTimeFromDate(client.fecha_vencimiento);
      return dueDate.getTime() === threeDaysLater.getTime();
    });

    // Crear los mensajes para los clientes que vencen hoy
    const messages = clientsDueToday.map(client => ({
      id: client.id,
      name: client.nombre,
      surname: client.apellido,
      telefono: client.telefono,
      mensaje: `Estimado/a ${client.apellido} ${client.nombre}. Le informamos que el seguro de su vehículo, con patente ${client.patente}, vence el día de hoy (${client.fecha_vencimiento.toLocaleDateString()}). Para evitar cualquier inconveniente, le recordamos que puede realizar el pago mediante efectivo o transferencia. Recuerde que este es un *mensaje automático.*`,
      defeated: true,
      company: client.compania,
      patent: client.patente,
      share: client.cuota,
      coverage: client.cobertura,
      lastPayment: client.ultimo_pago,
    }));

    // Crear los mensajes para los clientes que vencen en tres días
    clientsDueInThreeDays.forEach(client => {
      messages.push({
        id: client.id,
        name: client.nombre,
        surname: client.apellido,
        telefono: client.telefono,
        mensaje: `Hola ${client.apellido} ${client.nombre}. Te recordamos que la cuota del seguro de tu vehículo con patente ${client.patente} está por vencer el (${client.fecha_vencimiento.toLocaleDateString()}). Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ayudarte! Recuerde que este es un *mensaje automático.*`,
        defeated: false,
        company: client.compania,
        patent: client.patente,
        share: client.cuota,
        coverage: client.cobertura,
        lastPayment: client.ultimo_pago,
      });
    });

    return res.status(200).json(messages);

  } catch (error) {
    console.error('Error al obtener clientes:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getClientExpired };
