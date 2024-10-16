const xlsx = require('xlsx');
const twilio = require('twilio');
const { filterClients } = require('./helpers');

// Configurar Twilio usando las variables de entorno
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Función para enviar mensaje de WhatsApp
const sendMessageWhatsApp = (telefono, mensaje) => {
    return client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER, // Número de Twilio
        to: `whatsapp:${telefono}`, // Número del cliente
        body: mensaje, // El mensaje a enviar
    });
};

// Función para leer el archivo Excel y enviar mensajes
const sendMessagesToClients = async () => {
    const asegurados = filterClients();

    // Filtrar asegurados que vencen hoy (Días a Vencer = 0) o en 3 días (Días a Vencer = 3)
    const aseguradosVencenHoy = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 0);
    const aseguradosPorVencer = asegurados.filter(asegurado => asegurado['Dias a Vencer'] === 3);

    // Enviar mensajes a asegurados que vencen hoy
    for (const asegurado of aseguradosVencenHoy) {
        const mensaje = `Hola ${asegurado.Nombre}, su seguro vence hoy (${asegurado['Fecha Vencimiento']}). Por favor, renueve a tiempo.`;
        await sendMessageWhatsApp(asegurado.Telefono, mensaje);
    }

    // Enviar mensajes a asegurados que vencen en 3 días
    for (const asegurado of aseguradosPorVencer) {
        const mensaje = `Hola ${asegurado.Nombre}, su seguro vence en 3 días (${asegurado['Fecha Vencimiento']}). No olvide renovarlo.`;
        await sendMessageWhatsApp(asegurado.Telefono, mensaje);
    }
};

module.exports = { sendMessagesToClients };
