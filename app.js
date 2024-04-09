require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//services
const payappService = require("./services/payapp_service");
const lbhService = require("./services/labor_hours_form_service");
app.use('/payapp', payappService);
app.use('/', lbhService);

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
