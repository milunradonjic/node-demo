const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

// graphql
const graphqlHTTP = require('./graphql/http');

const handleError = require('./middlewares/error_handling');

// Created Database and Load Data
require('./db/mongoose');
require('./loaders/data');

const router = require('./routers/router');
const { isAuthGraphQL } = require('./middlewares/auth');

const app = express();

app.use(helmet());
app.use(logger(process.env.LOGGER));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

// GraphQL endpoint
app.use(isAuthGraphQL);
app.use('/graphql', graphqlHTTP);

app.use(handleError);

module.exports = app;
