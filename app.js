const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes');
const createTables = require("./src/migrations/index");

// Initilize all database tables
createTables.createAllTables();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
// CORS
app.use(cors);

app.use(routes);

// Errors
app.use((req,res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app;