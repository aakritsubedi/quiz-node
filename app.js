const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes');
const createTables = require("./src/migrations/index");
const {errorHandler} = require("./src/middlewares/handleError");

// Initilize all database tables
createTables.createAllTables();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
// CORS
app.use(cors());

app.use(routes);

// Errors
app.use(errorHandler);


module.exports = app;