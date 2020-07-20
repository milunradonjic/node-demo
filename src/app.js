const express = require('express');
const helmet = require('helmet');
require('./db/mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('../config/swagger/swaggerDocument');
const router = require('./routers/router');

const app = express();

app.use(helmet());
// app.use(helmet.csp());
// app.use(helmet.xframe('sameorigin'));
// //  TODO: Uncomment when using SSL
// // app.use(helment.hsts())
// app.use(helmet.iexss());
// app.use(helmet.cacheControl());
// app.use((req, res, next) => {
//   res.setHeader('Pragma', 'no-cache');
//   res.setHeader('Expires', '0');
//   res.locals.csrftoken = req.csrftoken();
//   next();
// });

app.use(express.json());
app.use('/api', router);

const swaggerDefinition = swaggerDocument;

const options = {
  swaggerDefinition,
  definitions: ['./src/models/*.js'],
  apis: ['./src/routers/*.js'],
};

console.log(options);

const swaggerSpec = swaggerJSDoc(options);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
