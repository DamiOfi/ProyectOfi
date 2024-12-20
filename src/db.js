const { Sequelize } = require('sequelize'); 
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Credenciales de la base de datos
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Cargar dinámicamente los modelos
fs.readdirSync(path.join(__dirname, './models'))
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, './models', file)));
  });

// Definir los modelos en Sequelize
modelDefiners.forEach(model => model(sequelize));

// Capitalizar los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Definir relaciones después de cargar todos los modelos
const { Client, Vehicle } = sequelize.models;

Client.hasMany(Vehicle, { 
  foreignKey: 'client_id',
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Vehicle.belongsTo(Client, { 
  foreignKey: 'client_id',
  targetKey: 'id',
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
