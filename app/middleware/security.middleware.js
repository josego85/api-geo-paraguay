const helmet = require('helmet');
const cors = require('cors');
const expectCt = require("expect-ct");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const securityMiddleware = (app) => {
    // Security headers using Helmet
    app.use(helmet());

    // Set Referrer Policy to 'strict-origin'
    app.use(helmet.referrerPolicy({ policy: 'strict-origin' }));

    // Set Content Security Policy (CSP)
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
                imgSrc: ["'self'"],
            },
        })
    );

    // Sets Expect-CT: enforce, max-age=123
    app.use(
        expectCt({
            enforce: true,
            maxAge: 123,
        })
    );

    // Set X-Frame-Options
    app.use(helmet.frameguard({ action: 'DENY' }));

    // Set X-Permitted-Cross-Domain-Policies header to 'none'
    app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));

    // // Set Feature-Policy header to restrict certain features
    // app.use(
    //     helmet.featurePolicy({
    //         features: {
    //             geolocation: ["'none'"],
    //             camera: ["'none'"],
    //             microphone: ["'none'"],
    //         },
    //     })
    // );

    app.use(
        cors({
            origin: '*',
            optionsSuccessStatus: 200,
            methods: ['GET'],
        })
    );

    app.use(limiter);
};


module.exports = securityMiddleware;
