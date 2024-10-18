const xlsx = require('xlsx');
const twilio = require('twilio');
const { filterClients } = require('./helpers');

// Configurar Twilio usando las variables de entorno
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Función para enviar mensaje de WhatsApp

const sendMessageWhatsApp = async (telefono, mensaje) => {
    try {
        console.log(`Enviando mensaje a: ${telefono}`);  // Verificar qué número se está usando
        console.log(`Mensaje: ${mensaje}`);  // Verificar el contenido del mensaje

        const response = await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER, // Número de Twilio
            to: `whatsapp:${telefono}`, // Número del cliente
            body: mensaje, // El mensaje a enviar
        });

        console.log(`Mensaje enviado correctamente a ${telefono}. SID: ${response.sid}`);  // Log exitoso
        return response;
    } catch (error) {
        console.error(`Error enviando mensaje a ${telefono}:`, error);  // Log de error
    }
};

// Función para leer el archivo Excel y enviar mensajes
const sendMessagesToClients = async () => {
    const asegurados = filterClients();
    console.log('Total de asegurados:', asegurados.length);

    const aseguradosVencenHoy = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 0);
    const aseguradosPorVencer = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 3);

    console.log('Asegurados que vencen hoy:', aseguradosVencenHoy.length);
    console.log('Asegurados que vencen en 3 días:', aseguradosPorVencer.length);

    // Enviar mensajes a los que vencen hoy
    for (const asegurado of aseguradosVencenHoy) {
        const mensaje = `Hola ${asegurado.Nombre}, su seguro vence hoy (${asegurado['Fecha Vencimiento']}). Por favor, renueve a tiempo.`;
        /* await sendMessageWhatsApp(asegurado.Telefono, mensaje); */
        console.log(asegurado.Telefono, mensaje);
    }

    // Enviar mensajes a los que vencen en 3 días
    for (const asegurado of aseguradosPorVencer) {
        const mensaje = `Hola ${asegurado.Nombre}, su seguro vence en 3 días (${asegurado['Fecha Vencimiento']}). No olvide renovarlo.`;
        /* await sendMessageWhatsApp(asegurado.Telefono, mensaje); */
        console.log(asegurado.Telefono, mensaje);
    }
};

module.exports = { sendMessagesToClients };
