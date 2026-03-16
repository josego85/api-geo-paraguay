const helmet = require('helmet');
const cors = require('cors');
const expectCt = require('expect-ct');
const featurePolicy = require('feature-policy');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests, please try again later.',
});

// Instantiate middleware handlers once at module load (not per request).
const helmetMiddleware = helmet({
  referrerPolicy: { policy: 'strict-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  },
  frameguard: { action: 'DENY' },
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
});

const expectCtMiddleware = expectCt({
  enforce: true,
  maxAge: 86400, // 24 hours
});

const featurePolicyMiddleware = featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    syncXhr: ["'none'"],
    geolocation: ["'none'"],
    camera: ["'none'"],
    microphone: ["'none'"],
  },
});

// Wrap a middleware so it skips /api-docs routes.
const skipApiDocs = (middleware) => (req, res, next) => {
  if (req.path.startsWith('/api-docs')) return next();
  return middleware(req, res, next);
};

const securityMiddleware = (app) => {
  app.use(skipApiDocs(helmetMiddleware));
  app.use(skipApiDocs(expectCtMiddleware));
  app.use(skipApiDocs(featurePolicyMiddleware));

  app.use(
    cors({
      origin: '*',
      optionsSuccessStatus: 200,
      methods: ['GET'],
    }),
  );

  app.use(limiter);
};

module.exports = securityMiddleware;
