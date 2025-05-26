const helmet = require('helmet');
const cors =require('cors');
const expectCt = require('expect-ct');
const permissionsPolicy = require('permissions-policy'); // Replaced feature-policy
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.',
});
const securityMiddleware = (app) => {
  app.use((req, res, next) => {
    if (req.path.startsWith('/api-docs')) {
      return next();
    }

    // Security headers using Helmet
    app.use(helmet());
    app.use(helmet.referrerPolicy({ policy: 'strict-origin' }));
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
    app.use(
      expectCt({
        enforce: true,
        maxAge: 123,
      })
    );
    app.use(helmet.frameguard({ action: 'DENY' }));
    app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));
    app.use(
      permissionsPolicy({ // Replaced featurePolicy with permissionsPolicy
        features: {
          fullscreen: ["'self'"],
          vibrate: ["'none'"],
          syncXhr: ["'none'"],
          geolocation: ["'none'"],
          camera: ["'none'"],
          microphone: ["'none'"],
        },
      })
    );

    // Set Cache-Control header to prevent caching
    res.setHeader('Cache-Control', 'no-store');

    return next();
  });

  // CORS Configuration
  // The current configuration allows requests from any origin ('*') and only GET methods.
  // This is suitable for a public, read-only API.
  // If this API is primarily intended to be consumed by a specific frontend application,
  // consider restricting the 'origin' to that application's domain for enhanced security.
  // e.g., origin: 'https://your-frontend-app.com'
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
