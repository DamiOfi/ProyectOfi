const { Cliente } = require('../db');
const { Op } = require('sequelize');

// Función para obtener el inicio del día
const startOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(0, 0, 0, 0); // UTC para evitar problemas de zonas horarias
  return newDate;
};

// Función para obtener el final del día
const endOfDay = (date) => {
  const newDate = new Date(date);
  newDate.setUTCHours(23, 59, 59, 999); // UTC para evitar problemas de zonas horarias
  return newDate;
};

// Función para sumar un día a una fecha
const addOneDay = (date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

// Controlador para obtener clientes que vencen hoy y en tres días
const getClientExpired = async (req, res) => {
  try {
    // Fechas de inicio y fin para hoy
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // Fechas de inicio y fin para dentro de tres días
    const threeDaysLaterStart = startOfDay(new Date());
    threeDaysLaterStart.setDate(threeDaysLaterStart.getDate() + 3);
    const threeDaysLaterEnd = endOfDay(threeDaysLaterStart);

    // Consultar clientes que vencen hoy o en tres días
    const clients = await Cliente.findAll({
      where: {
        fecha_vencimiento: {
          [Op.or]: [
            { [Op.between]: [todayStart, todayEnd] }, // Hoy
            { [Op.between]: [threeDaysLaterStart, threeDaysLaterEnd] }, // Dentro de tres días
          ],
        },
      },
    });

    // Crear los mensajes
    const messages = clients.map(client => {
      // Determinar si el cliente vence hoy
      const isDueToday = client.fecha_vencimiento >= todayStart && client.fecha_vencimiento <= todayEnd;

      // Formatear fecha ajustada (+1 día)
      const formattedDate = addOneDay(client.fecha_vencimiento).toLocaleDateString();

      return {
        id: client.id,
        nombre: client.nombre,
        apellido: client.apellido,
        telefono: client.telefono,
        mensaje: isDueToday
          ? `Estimado/a ${client.apellido} ${client.nombre}. Le informamos que el seguro de su vehículo, con patente ${client.patente}, vence el día de hoy (${formattedDate}). Para evitar cualquier inconveniente, le recordamos que puede realizar el pago mediante efectivo o transferencia. Recuerde que este es un *mensaje automático.*`
          : `Hola ${client.apellido} ${client.nombre}. Te recordamos que la cuota del seguro de tu vehículo con patente ${client.patente} está por vencer el (${formattedDate}). Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ayudarte! Recuerde que este es un *mensaje automático.*`,
        vencido: isDueToday,
        compania: client.compania,
        patente: client.patente,
        cuota: client.cuota,
        cobertura: client.cobertura,
        ultimo_pago: client.ultimo_pago,
      };
    });

    return res.status(200).json(messages);

  } catch (error) {
    console.error('Error al obtener clientes:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getClientExpired };
