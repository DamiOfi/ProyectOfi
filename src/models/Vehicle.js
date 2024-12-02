const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    compañia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuota: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cobertura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ultimo_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    primer_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_real: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    precio_agencia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'vehicles',
    timestamps: false,
  });

  return Vehicle;
};
