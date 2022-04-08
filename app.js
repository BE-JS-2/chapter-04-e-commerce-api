const errorHandler = require('./middleware/errorHandler');
const authorize    = require('./middleware/authorize');
const express      = require('express');
const logger       = require('morgan');

const productRouter = require('./routes/product');
const usersRouter   = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/product', productRouter);

// error handling
app.use(errorHandler);

module.exports = app;
