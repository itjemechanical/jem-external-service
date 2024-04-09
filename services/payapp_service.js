// Importar Express y los modelos necesarios
const express = require('express');
const Payapp = require('../models/payapp');

// Crear un enrutador de Express
const router = express.Router();

router.get('/', async (req, res) => {
    const subcontractor = req.subcontractor;
    try {
        const payappsWithChildren = await Payapp.findAll({
            where: { subcontractor: subcontractor },
            include: 'childs', 
        });

        let projects = [];

        payappsWithChildren.forEach((el) => {
            if(!projects.includes(el.project)){
                projects.push(el.project)
            }
        });

        res.json({
            payapps:payappsWithChildren,
            projects: projects
        });
    } catch (error) {
        console.error('Error al buscar por subcontractor:', error);
        res.status(500).json({ error: 'Error al buscar por subcontractor' });
    }
});



module.exports = router;
