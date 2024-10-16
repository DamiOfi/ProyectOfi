require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const { sendMessagesToClients } = require('./sendMessages');

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta para enviar mensajes
app.post('/send-messages', async (req, res) => {
    try {
        /* await sendMessagesToClients();  */// Lógica para enviar mensajes
        res.status(200).send('Mensajes enviados');
    } catch (error) {
        res.status(500).send('Error enviando mensajes');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
