const express = require('express');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const { Op } = require('sequelize');

// Crear un enrutador de Express
const router = express.Router();

router.get('/', (req, res) => {
    // Renderizar la plantilla y pasarle datos
    res.render('laborhours_form');
});

router.post('/laborhours_form/', (req, res) => {
    // Renderizar la plantilla y pasarle datos
    console.log(req.body);

    res.json(req.body);
});


module.exports = router;