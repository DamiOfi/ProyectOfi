const { conn, Cliente } = require('./src/db'); // Importamos la conexión y el modelo Cliente

// Sincronizar los modelos con la base de datos
conn.sync({ force: true }) // Usa `force: true` solo en desarrollo si deseas borrar las tablas
  .then(() => {
    console.log('Tablas creadas o actualizadas correctamente');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });
