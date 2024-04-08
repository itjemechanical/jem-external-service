require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//services
const payappService = require("./services/payapp_service");
const render = require("./services/render");
app.use('/payapp', payappService);
app.use('/', render);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
