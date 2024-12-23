const { conn } = require('./src/db'); // Conexión a la base de datos
const server = require('./src/server'); // Servidor Express
const PORT = process.env.PORT || 3001; // Puerto configurable desde .env o default: 3001

// Determinar el entorno (desarrollo o producción)
const isProduction = process.env.NODE_ENV === 'production';

// Manejo de errores global
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Finaliza el proceso para evitar problemas graves
});

// Sincronizar la base de datos y levantar el servidor
conn.sync({ force: !isProduction }) // `force: true` en desarrollo, `false` en producción
  .then(() => {
    console.log(`Base de datos sincronizada (force: ${!isProduction})`);
    server.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT} (entorno: ${isProduction ? 'producción' : 'desarrollo'})`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
    process.exit(1); // Finaliza el proceso si hay un error grave
  });
