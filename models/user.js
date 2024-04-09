// user.model.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../sequelize');

const User = sequelize.define('User', {
    subcontractor: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
},{
    freezeTableName: true,
    tableName: 'User'
});

User.prototype.generateAuthToken = function() {
    return jwt.sign({ user: this.user }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

User.prototype.validatePassword = function(password) {
    return password == this.password;
};

module.exports = User;
