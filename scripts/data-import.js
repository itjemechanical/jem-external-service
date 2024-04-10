require('dotenv').config();

const axios = require('axios');
const sequelize = require('../sequelize');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const User = require('../models/user');

const url_payapps = process.env.URL_APPSCRIPT + '?mode=rest&service=payapps';
const url_payapp_childs = process.env.URL_APPSCRIPT + '?mode=rest&service=payapp_childs';
const url_users = process.env.URL_APPSCRIPT + '?mode=rest&service=users';

async function fetchDataAndSaveToDatabase() {
    try {
        let payapps = await axios.get(url_payapps);
        let payapp_childs = await axios.get(url_payapp_childs);
        let users = await axios.get(url_users);
        
        await sequelize.sync({ force: true }); // clean database

        let payapps_list = [];
        payapps = payapps.data.filter((el) => {
            if(el.id != '' && !payapps_list.includes(el.id) ){
                payapps_list.push(el.id);
            }
            return el.id != '';
        });
        
        payapp_childs = payapp_childs.data.filter((el) => {
            return el.id != '' && payapps_list.includes(el.payapp);
        })
        users = users.data.filter((el) => (el.user != '') );

        await Payapp.bulkCreate(payapps);
        await PayappChild.bulkCreate(payapp_childs);
        await User.bulkCreate(users);

        console.log('Datos guardados en la base de datos correctamente.');
    } catch (error) {
        console.error('Error al obtener los datos del servidor:', error);
    }
}

fetchDataAndSaveToDatabase();
