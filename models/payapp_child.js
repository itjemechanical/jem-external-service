const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
//const Payapp = require('./payapp');

const PayappChild = sequelize.define('PayappChild', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    payapp: {
        type: DataTypes.STRING,
        allowNull: true,
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

//PayappChild.belongsTo(Payapp, { foreignKey: 'id' });

module.exports = PayappChild;
