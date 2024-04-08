// Importar Express y los modelos necesarios
const express = require('express');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const { Op } = require('sequelize');

// Crear un enrutador de Express
const router = express.Router();

router.get('/:subcontractor', async (req, res) => {
    const subcontractor = req.params.subcontractor;
    try {
        const payapps = await Payapp.findAll({
            where: { subcontractor: subcontractor },
        });

        PayappIds = payapps.map(payapp => payapp.id);

        const childrens = await PayappChild.findAll({
            //where: { payapp : {[Op.in]: PayappIds} },
        });

        res.json(childrens);
    } catch (error) {
        console.error('Error al buscar por subcontractor:', error);
        res.status(500).json({ error: 'Error al buscar por subcontractor' });
    }
});

module.exports = router;
