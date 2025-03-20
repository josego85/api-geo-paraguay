const express = require('express');
const createLocaleMiddleware = require('express-locale');
const { createYoga } = require('graphql-yoga');
const securityMiddleware = require('middleware/security.middleware');
const swaggerUi = require('swagger-ui-express');
const { lookup } = require('geoip-lite');
const swaggerDocument = require('config/swagger.config');
const rest = require('routes/index');
const startPolyglot = require('middleware/startPolyglot.middleware');
const Log = require('models/log.model');
const graphqlSchema = require('./graphql/schema');

const app = express();

app.use(express.json());

// Middleware for locale and translations
app.use(
  createLocaleMiddleware({
    priority: ['accept-language', 'default'],
    default: 'en-US',
  })
);
app.use(startPolyglot);

// Security middleware
securityMiddleware(app);

// Logging middleware
app.use(async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = lookup(ip);
  const log = new Log({ url: req.url, method: req.method, ip, geo });
  await log.save();
  next();
});

// API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', rest);

// GraphQL setup
const yoga = createYoga({
  schema: graphqlSchema,
  graphqlEndpoint: '/graphql',
});
app.use('/graphql', yoga);

module.exports = app;
