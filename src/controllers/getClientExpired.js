const { filterClients } = require('../helpers/excelHelper');
const { excelDateToJSDate2 } = require('../utils/dateUtils');

// Función para remover la parte de la hora de una fecha
const removeTimeFromDate = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);  // Establecer la hora en 00:00:00 para comparar solo la fecha
    return newDate;
};

// Función ajustada para convertir fechas de Excel a objetos Date en JavaScript
const excelDateToJSDate = (excelDate) => {
    const date = new Date((excelDate - 25569) * 86400 * 1000);
    
    // Ajustar por discrepancia del sistema de fechas de Excel (resta de un día)
    const adjustedDate = new Date(date.setDate(date.getDate() + 1));
    return adjustedDate;
};

// Función para leer el archivo Excel y enviar mensajes
const getClientExpired = async (req, res) => {
    try {
        const asegurados = filterClients();
        console.log('Total de asegurados:', asegurados.length);

        // Obtener la fecha de hoy y de 3 días después, sin la hora
        const today = removeTimeFromDate(new Date());
        const threeDaysLater = new Date(today);
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
        let idAux = 0;
        // Crear los mensajes de los que vencen hoy
        for (const asegurado of aseguradosVencenHoy) {
            ++idAux;
            const fechaVencimiento = excelDateToJSDate2(asegurado['Fecha Vencimiento']);
            const ultPago = excelDateToJSDate2(asegurado['Ultimo pago']);
            const mensaje = `Estimado/a ${asegurado.Apellido} ${asegurado.Nombre}. Le informamos que el seguro de su vehículo, con patente ${asegurado.Patente}, vence el día de hoy (${fechaVencimiento}). Para evitar cualquier inconveniente, le recordamos que puede realizar el pago mediante efectivo o transferencia. Quedamos a su disposición para cualquier consulta. Recuerde que es un *mensaje automatico.*`;
            mensajesAEnviar.push({ name:asegurado.Nombre, 
                surname:asegurado.Apellido, 
                telefono: asegurado.Telefono, 
                mensaje: mensaje, 
                id:idAux, 
                defeated:true,
                company:asegurado.Compania,
                patent:asegurado.Patente,
                share:asegurado.Cuota,
                coverage:asegurado.Cobertura,
                lastPayment:ultPago
            });
        }

        // Crear los mensajes de los que vencen en 3 días
        for (const asegurado of aseguradosPorVencer) {
            ++idAux
            const fechaVencimiento = excelDateToJSDate2(asegurado['Fecha Vencimiento']);
            const ultPago = excelDateToJSDate2(asegurado['Ultimo pago']);
            const mensaje = `Hola ${asegurado.Apellido} ${asegurado.Nombre}. Te recordamos que la cuota del seguro de tu vehículo con patente ${asegurado.Patente} está por vencer el (${fechaVencimiento}). Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ayudarte!. Recuerde que es un *mensaje automatico.*`;
            mensajesAEnviar.push({name:asegurado.Nombre, 
                surname:asegurado.Apellido, 
                telefono: asegurado.Telefono, 
                mensaje: mensaje, id:idAux, 
                defeated:false,
                company:asegurado.Compania,
                patent:asegurado.Patente,
                share:asegurado.Cuota,
                coverage:asegurado.Cobertura,
                lastPayment:ultPago
             });
        }

        return res.status(200).json(mensajesAEnviar);

    } catch (error) {
        console.error('Error al procesar los mensajes:', error.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getClientExpired };
