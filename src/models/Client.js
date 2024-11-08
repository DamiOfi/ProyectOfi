const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    compania: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuota: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cobertura: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ultimo_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    primer_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    precio_anterior: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    // Nuevos campos
    precio_real: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    precio_agencia: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    precio_total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    enviar_mensaje: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // No permite valores nulos
      defaultValue: true, // El valor por defecto es true
    },
  }, {
    timestamps: true,
    tableName: 'clientes',
  });

  // Métodos adicionales para el modelo
  Cliente.prototype.calcularPrecioTotal = function () {
    if (this.precio_real && this.precio_agencia) {
      return this.precio_real + this.precio_agencia;
    }
    return 0;
  };

  return Cliente;
};
