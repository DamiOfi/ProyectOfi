const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_agencia: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    compañia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ultimo_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cuota: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cobertura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    año: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    local: {
      type: DataTypes.STRING,
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
    precio_real: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'cars',
    timestamps: false,
  });

  return Car;
};
