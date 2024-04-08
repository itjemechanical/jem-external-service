const sequelize = require('./sequelize');
const PayappChild = require('./models/payapp_child');
const Payapp = require('./models/payapp');
const User = require('./models/user');

// Sincronizar modelos con la base de datos
sequelize.sync(
    { force: true }
).then(() => {
    console.log('Modelos sincronizados con la base de datos');
});
