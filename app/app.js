const express = require('express');
const createLocaleMiddleware = require('express-locale');
const securityMiddleware = require('middleware/security.middleware.js');
const swaggerUi = require('swagger-ui-express');
const { lookup } = require('geoip-lite');
const swaggerDocument = require('config/swagger.config.js');
const rest = require('routes/index.js');
const startPolyglot = require('middleware/startPolyglot.middleware.js');
const Log = require('models/log.model.js');

const app = express();

app.use(express.json());

// Translation. English default language.
app.use(
    createLocaleMiddleware({
        priority: ['accept-language', 'default'],
        default: 'en-US',
    })
);

// Set the language in the req with the phrases to be used.
app.use(startPolyglot);

securityMiddleware(app);

app.use(async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const geo = lookup(ip);
    const log = new Log({
        url: req.url,
        method: req.method,
        ip,
        geo,
    });

    await log.save();
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', rest);

module.exports = app;
