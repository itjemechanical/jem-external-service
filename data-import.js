require('dotenv').config();

const axios = require('axios');
const sequelize = require('./sequelize');
const Payapp = require('./models/payapp');
const PayappChild = require('./models/payapp_child');
const User = require('./models/user');

const url_payapps = process.env.URL_APPSCRIPT + '?mode=rest&service=payapps';
const url_payapp_childs = process.env.URL_APPSCRIPT + '?mode=rest&service=payapp_childs';
const url_users = process.env.URL_APPSCRIPT + '?mode=rest&service=users';

async function fetchDataAndSaveToDatabase() {
    try {
        let payapps = await axios.get(url_payapps);
        let payapp_childs = await axios.get(url_payapp_childs);
        let users = await axios.get(url_users);

        await sequelize.sync();

        payapps = payapps.data.filter((el) => el.id != '' );
        payapp_childs = payapp_childs.data.filter((el) => el.id != '' )
        users = users.data.filter((el) => el.user != '' )

        await Payapp.bulkCreate(payapps);
        await PayappChild.bulkCreate(payapp_childs);
        await User.bulkCreate(users);

        console.log('Datos guardados en la base de datos correctamente.');
    } catch (error) {
        console.error('Error al obtener los datos del servidor:', error);
    }
}

fetchDataAndSaveToDatabase();
