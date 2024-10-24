require('dotenv').config(); // Carga las variables del .env
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Permitir solicitudes de cualquier origen
app.use(cors());

// Importar el enrutador
const routes = require('./src/routers/index'); // Ajusta la ruta si es necesario

// Middleware para procesar datos JSON (opcional si necesitas más adelante)
app.use(express.json());

// Usar las rutas desde el enrutador
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
