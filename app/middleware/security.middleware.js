const helmet = require('helmet');
const cors = require('cors');
const expectCt = require("expect-ct");

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
};


module.exports = securityMiddleware;
