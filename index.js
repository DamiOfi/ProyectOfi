const { conn } = require('./src/db'); // Conexión a la base de datos
const server = require('./src/server'); // Servidor Express
const PORT = 48088;

// Manejo de errores global
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Finaliza el proceso para evitar problemas graves
});


// Servidor en RAILWAY
conn.sync({ force: false }) // `force: true` en desarrollo, `false` en producción
.then(() => {
  console.log(`Base de datos sincronizada (force: false)`); // force: false para no borrar la base de datos
  server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT} (entorno: producción)`);
  });
})
.catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
  process.exit(1); // Finaliza el proceso si hay un error grave
});


/* //Servidor en local
conn.sync({ force: true }) // `force: true` en desarrollo, `false` en producción
.then(() => {
  console.log(`Base de datos sincronizada (force: true)`);
  server.listen(3001, () => {
    console.log(`Servidor escuchando en puerto 3001 (entorno: desarrollo`);
  });
})
.catch((error) => {
  console.error('Error al sincronizar la base de datos:', error);
  process.exit(1); // Finaliza el proceso si hay un error grave
}); */
