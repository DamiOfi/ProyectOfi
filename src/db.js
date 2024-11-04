// database.js
const { Sequelize } = require('sequelize');

// Configura la conexión
const sequelize = new Sequelize('nombre_de_tu_base_de_datos', 'postgres', 'tu_contraseña', {
    host: 'localhost',
    dialect: 'postgres'
});

// Probar la conexión
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a PostgreSQL:', error);
    }
}

testConnection();

module.exports = sequelize;
