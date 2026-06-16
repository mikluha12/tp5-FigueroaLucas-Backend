const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empleado = require('./Empleado');

const Publicacion = sequelize.define('Publicacion', {
  titulo:           { type: DataTypes.STRING, allowNull: false },
  contenido:        { type: DataTypes.TEXT },
  imagenAsociada:   { type: DataTypes.TEXT },   // base64
  fechaPublicacion: { type: DataTypes.STRING },
  vigente:          { type: DataTypes.BOOLEAN, defaultValue: true },
});

// Relación: una publicación pertenece a un empleado
Publicacion.belongsTo(Empleado, { foreignKey: 'empleadoId', as: 'empleado' });
Empleado.hasMany(Publicacion,   { foreignKey: 'empleadoId', as: 'publicaciones' });

module.exports = Publicacion;