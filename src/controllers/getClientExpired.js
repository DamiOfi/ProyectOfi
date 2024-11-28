const { Client, Car } = require('../db');
const { Op } = require('sequelize');
const { dateToJSDate } = require('../utils/dateUtils'); // Importamos la función

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

// Controlador para obtener clientes y sus vehículos que vencen hoy o en tres días
const getClientExpired = async (req, res) => {
  try {
    // Fechas de inicio y fin para hoy
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    // Fechas de inicio y fin para dentro de tres días
    const threeDaysLaterStart = startOfDay(new Date());
    threeDaysLaterStart.setDate(threeDaysLaterStart.getDate() + 3);
    const threeDaysLaterEnd = endOfDay(threeDaysLaterStart);

    // Consultar clientes con vehículos que vencen hoy o en tres días
    const clients = await Client.findAll({
      include: [
        {
          model: Car,
          as: 'Cars',
          where: {
            fecha_vencimiento: {
              [Op.or]: [
                { [Op.between]: [todayStart, todayEnd] }, // Hoy
                { [Op.between]: [threeDaysLaterStart, threeDaysLaterEnd] }, // Dentro de tres días
              ],
            },
          },
          required: true, // Solo traer clientes con vehículos que cumplan la condición
        },
      ],
    });

    // Crear los mensajes para cada cliente y sus vehículos
    const messages = clients.map((client) => {
      return client.Cars.map((car) => {
        // Determinar si el vehículo vence hoy
        const isDueToday =
          car.fecha_vencimiento >= todayStart &&
          car.fecha_vencimiento <= todayEnd;

        const sumarUnDia = (fechaCadena) => {
          return new Date(new Date(fechaCadena).setDate(new Date(fechaCadena).getDate() + 1));
        }

        return {
          id_cliente: client.id,
          nombre: client.nombre,
          apellido: client.apellido,
          telefono: client.telefono,
          mensaje: isDueToday
            ? `Estimado/a ${client.apellido} ${client.nombre}. Le informamos que el seguro de su vehículo, con patente ${car.patente}, vence el día de hoy (${ dateToJSDate(sumarUnDia(car.fecha_vencimiento))}). Para evitar cualquier inconveniente, le recordamos que puede realizar el pago mediante efectivo o transferencia. Recuerde que este es un *mensaje automático.*`
            : `Hola ${client.apellido} ${client.nombre}. Te recordamos que la cuota del seguro de tu vehículo con patente ${car.patente} está por vencer el (${dateToJSDate(car.fecha_vencimiento)}). Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ayudarte! Recuerde que este es un *mensaje automático.*`,
          vencido_hoy: isDueToday,
          compania: car.compañia,
          patente: car.patente,
          cuota: car.cuota,
          cobertura: car.cobertura,
          ultimo_pago: car.ultimo_pago,
        };
      });
    }).flat(); // Aplanar el arreglo de mensajes

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error al obtener clientes y vehículos:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getClientExpired };
