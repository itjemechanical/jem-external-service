require('dotenv').config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//services
const payappService = require("./services/payapp_service");
const projectService = require("./services/project_service");
app.use('/payapp', payappService);
app.use('/project', projectService);

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
