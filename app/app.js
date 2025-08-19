const express = require('express');
const createLocaleMiddleware = require('express-locale');
const securityMiddleware = require('middleware/security.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('config/swagger.config');
const rest = require('routes/index');
const startPolyglot = require('middleware/startPolyglot.middleware');
const loggingMiddleware = require('middleware/logging.middleware');
const graphqlRouter = require('./graphql/routes');

const app = express();

app.use(express.json());
app.use(
  createLocaleMiddleware({
    priority: ['accept-language', 'default'],
    default: 'en-US',
  }),
);
app.use(startPolyglot);
app.use(loggingMiddleware);
securityMiddleware(app);

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', rest);
app.use('/graphql', graphqlRouter);

module.exports = app;
