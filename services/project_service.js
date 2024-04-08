// Importar Express y los modelos necesarios
const express = require('express');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const { Op } = require('sequelize');

// Crear un enrutador de Express
const router = express.Router();

module.exports = router;
