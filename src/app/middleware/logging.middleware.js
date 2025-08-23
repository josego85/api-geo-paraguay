const { lookup } = require('geoip-lite');
const Log = require('models/log.model');

const loggingMiddleware = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = lookup(ip);
  const log = new Log({ url: req.url, method: req.method, ip, geo });
  await log.save();
  next();
};

module.exports = loggingMiddleware;
