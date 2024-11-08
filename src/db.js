require('dotenv').config(); // Cargar las variables de entorno
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Obtener las credenciales de la base de datos desde el archivo .env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Crear la instancia de Sequelize con la cadena de conexión
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, // Desactiva los logs de las consultas
  native: false,  // Desactiva el uso de características nativas
});

const basename = path.basename(__filename); // Para evitar cargar el propio archivo db.js

const modelDefiners = [];

// Cargar dinámicamente todos los modelos en la carpeta "models"
fs.readdirSync(path.join(__dirname, './models'))
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, './models', file)));
  });

// Definir los modelos en Sequelize
modelDefiners.forEach(model => model(sequelize));

// Capitalizar el nombre de los modelos (por convención)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Definir las relaciones entre los modelos (si es necesario)
const { Cliente } = sequelize.models;
// Aquí puedes agregar las relaciones entre modelos, si existieran

module.exports = {
  ...sequelize.models, // Para importar los modelos directamente
  conn: sequelize,      // Para importar la conexión directamente
};
