const { filterClients } = require('../helpers/excelHelper');
const { excelDateToJSDate2 } = require('../utils/dateUtils');

// Función para remover la parte de la hora de una fecha
const removeTimeFromDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);  // Establecer la hora en 00:00:00 para comparar solo la fecha
    return newDate;
};

// Función para convertir fechas de Excel a objetos Date
const excelDateToJSDate = (excelDate) => {
    return new Date((excelDate - 25569) * 86400 * 1000);
};

// Función para leer el archivo Excel y enviar mensajes (sin Twilio)
const getClientExpired = async (req, res) => {
    try {
        const asegurados = filterClients();
        console.log('Total de asegurados:', asegurados.length);

        // Obtener la fecha de hoy y de 3 días después, sin la hora
        const today = removeTimeFromDate(new Date());
        const threeDaysLater = removeTimeFromDate(new Date());
        threeDaysLater.setDate(today.getDate() + 3);  // Fecha de dentro de 3 días

        // Filtrar asegurados que vencen hoy y en 3 días usando la columna 'Fecha Vencimiento'
        const aseguradosVencenHoy = asegurados.filter(asegurado => {
            const fechaVencimientoJS = removeTimeFromDate(excelDateToJSDate(asegurado['Fecha Vencimiento']));
            return fechaVencimientoJS.getTime() === today.getTime();  // Comparar solo las fechas
        });

        const aseguradosPorVencer = asegurados.filter(asegurado => {
            const fechaVencimientoJS = removeTimeFromDate(excelDateToJSDate(asegurado['Fecha Vencimiento']));  // Convertir y quitar hora
            return fechaVencimientoJS.getTime() === threeDaysLater.getTime();  // Comparar solo las fechas
        });

        console.log('Asegurados que vencen hoy:', aseguradosVencenHoy.length);
        console.log('Asegurados que vencen en 3 días:', aseguradosPorVencer.length);

        // Array para almacenar los mensajes y teléfonos
        const mensajesAEnviar = [];

        // Crear los mensajes de los que vencen hoy
        for (const asegurado of aseguradosVencenHoy) {
            const fechaVencimiento = excelDateToJSDate(asegurado['Fecha Vencimiento']);  // Mantener la fecha original para el mensaje
            const mensaje = `Hola ${asegurado.Nombre}, su seguro vence hoy (${fechaVencimiento.toLocaleDateString('es-ES')}). Por favor, renueve a tiempo.`; // Formatear fecha
            mensajesAEnviar.push({ telefono: asegurado.Telefono, mensaje });
        }

        // Crear los mensajes de los que vencen en 3 días
        for (const asegurado of aseguradosPorVencer) {
            const fechaVencimiento = excelDateToJSDate(asegurado['Fecha Vencimiento']);  // Mantener la fecha original para el mensaje
            const mensaje = `Hola ${asegurado.Nombre}, su seguro vence en 3 días (${fechaVencimiento.toLocaleDateString('es-ES')}). No olvide renovarlo.`; // Formatear fecha
            mensajesAEnviar.push({ telefono: asegurado.Telefono, mensaje });
        }

        return res.status(200).json(mensajesAEnviar);

    } catch (error) {
        console.error('Error al procesar los mensajes:', error.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getClientExpired };
