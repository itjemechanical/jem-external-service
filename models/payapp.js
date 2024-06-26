const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const PayappChild = require('./payapp_child');

const Payapp = sequelize.define('Payapp', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    project: DataTypes.STRING,
    subcontractor: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING
},{
    freezeTableName: true,
    tableName: 'Payapp'
});

Payapp.hasMany(PayappChild, { foreignKey: 'payapp', as: 'childs'});

module.exports = Payapp;
