const { filterClients } = require('../helpers/excelHelper');

// Función para leer el archivo Excel y enviar mensajes (sin Twilio)
const getClientExpired = async (req, res) => {
    try {
        const asegurados = filterClients();
        console.log('Total de asegurados:', asegurados.length);

        // Filtrar asegurados que vencen hoy y en 3 días
        const aseguradosVencenHoy = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 0);
        const aseguradosPorVencer = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 3);

        console.log('Asegurados que vencen hoy:', aseguradosVencenHoy.length);
        console.log('Asegurados que vencen en 3 días:', aseguradosPorVencer.length);

        // Array para almacenar los mensajes y teléfonos
        const mensajesAEnviar = [];

        // Crear los mensajes de los que vencen hoy
        for (const asegurado of aseguradosVencenHoy) {
            const mensaje = `Hola ${asegurado.Nombre}, su seguro vence hoy (${asegurado['Fecha Vencimiento']}). Por favor, renueve a tiempo.`;
            mensajesAEnviar.push({ telefono: asegurado.Telefono, mensaje });  // Añadir al array
        }

        // Crear los mensajes de los que vencen en 3 días
        for (const asegurado of aseguradosPorVencer) {
            const mensaje = `Hola ${asegurado.Nombre}, su seguro vence en 3 días (${asegurado['Fecha Vencimiento']}). No olvide renovarlo.`;
            mensajesAEnviar.push({ telefono: asegurado.Telefono, mensaje });  // Añadir al array
        }

        console.log(mensajesAEnviar);
        return res.status(200).json(mensajesAEnviar);
        
    } catch (error) {
        console.error('Error al procesar los mensajes:', error.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = { getClientExpired };
