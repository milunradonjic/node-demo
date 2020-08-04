const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

require('./db/mongoose');

const router = require('./routers/router');

const app = express();

app.use(helmet());

app.use(logger(process.env.LOGGER));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

module.exports = app;
