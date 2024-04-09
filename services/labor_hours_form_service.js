const express = require('express');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const axios = require('axios');
const { Op } = require('sequelize');

// Crear un enrutador de Express
const router = express.Router();

router.get('/', (req, res) => {
    res.render('laborhours_form');
});

router.post('/save/', (req, res) => {
    const url = process.env.URL_APPSCRIPT + '?mode=rest&service=savelaborhours';
    body = req.body;
    axios.post(url, body)
    .then(response => {
      console.log('Respuesta del servicio:', response.data);
      res.json(req.body);
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
      // Aquí puedes manejar errores en caso de que ocurran durante la solicitud
      res.json({'msg': `error: ${error}`});
    });

    
});


module.exports = router;