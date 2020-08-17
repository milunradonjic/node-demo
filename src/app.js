const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

// graphql
const graphqlServer = require('./graphql/graphql');

const handleError = require('./middlewares/error_handling');

// Created Database and Load Data
require('./db/mongoose');
require('./loaders/data');

const router = require('./routers/router');

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger(process.env.LOGGER));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// GraphQL endpoint
graphqlServer.applyMiddleware({ app });

app.use(handleError);

module.exports = app;
