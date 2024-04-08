const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PayappChild = sequelize.define('PayappChild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    payapp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phase: {
        type: DataTypes.STRING,
        //allowNull: false,
    },
    price: DataTypes.FLOAT,
},{
    freezeTableName: true,
    tableName: 'PayappChild'
});

module.exports = PayappChild;
