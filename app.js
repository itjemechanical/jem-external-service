require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
var path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//services
const syncMiddleware = require("./middleware/sync.middleware");
const authMiddleware = require("./middleware/auth.middleware");

const payappService = require("./services/payapp_service");
const lbhService = require("./services/labor_hours_form_service");
const authService = require("./services/auth.service");

app.use(syncMiddleware);
app.use('/payapp', authMiddleware, payappService);
app.use('/auth', authService);
app.use('/labor_hours', lbhService);
app.use('/', function(req, res){
    res.render('home');
});

app.use(morgan('combined'));
const server = app.listen(port, () => console.log(`Listening on port ${port}!`));
