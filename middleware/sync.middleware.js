require('dotenv').config();

const axios = require('axios');
const sequelize = require('../sequelize');
const Payapp = require('../models/payapp');
const PayappChild = require('../models/payapp_child');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const { log } = require('console');

const filePath = path.join('./logs/lastSyncTaskExecution.json');
const sync_time = 12 * 60 * 60; // en segundos

//urls
const url_payapps = process.env.URL_APPSCRIPT + '?mode=rest&service=payapps';
const url_payapp_childs = process.env.URL_APPSCRIPT + '?mode=rest&service=payapp_childs';
const url_users = process.env.URL_APPSCRIPT + '?mode=rest&service=users';

async function fetchDataAndSaveToDatabase() {
    const transaction = await sequelize.transaction();
    try {
        let payapps = await axios.get(url_payapps);
        let payapp_childs = await axios.get(url_payapp_childs);
        let users = await axios.get(url_users);
        
        await sequelize.sync({ force: true });

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

        await Payapp.bulkCreate(payapps, {transaction,lock: true});
        await PayappChild.bulkCreate(payapp_childs, {transaction,lock: true});
        await User.bulkCreate(users, {transaction,lock: true});
        
        await transaction.commit();
        console.log('Datos guardados en la base de datos correctamente.');
    } catch (error) {
        console.error('Error al obtener los datos del servidor:', error);
        await transaction.rollback();
    }
 }

const syncTaskMiddleware = (req, res, next) => {
    let lastExecutionTime = null;
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        lastExecutionTime = JSON.parse(fileData).lastExecutionTime;
    } catch (err) {
        console.error('Error al leer el archivo JSON:');
    }

    if (!lastExecutionTime || Date.now() - new Date(lastExecutionTime) > sync_time * 1000) {
        console.log('Sincronizando Informacion');
        fetchDataAndSaveToDatabase().then(function (out) {
            const newLastExecutionTime = { lastExecutionTime: new Date().toISOString() };
            fs.writeFile(filePath, JSON.stringify(newLastExecutionTime), err => {
                if (err) {
                    console.error('Error al escribir en el archivo JSON:', err);
                }
            });
            console.log('Informacion Sincronizada');
            next();
        }, function(error){
            console.log(error);
        });
    }else{
        next();
    }
    
};

module.exports = syncTaskMiddleware;
