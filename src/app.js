const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const handleError = require('./middlewares/error-handling');

require('./db/mongoose');

const router = require('./routers/router');

const app = express();

app.use(helmet());
app.use(logger(process.env.LOGGER));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use(handleError);

module.exports = app;
