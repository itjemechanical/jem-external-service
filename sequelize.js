const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite3', // Ruta a tu base de datos SQLite
});

module.exports = sequelize;
