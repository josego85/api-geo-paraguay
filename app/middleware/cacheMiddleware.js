const cacheService = require('../services/cacheService');
const CacheKeyService = require('../services/cacheKeyService');

const withCache = (resource) => async (req, res, next) => {
  try {
    const cacheKey = CacheKeyService.generateKey(resource, {
      sorting: req.sorting,
    });

    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({ data: cachedData });
    }

    // Attach cache info to request for the controller to use
    req.cacheInfo = { key: cacheKey };
    return next();
  } catch (error) {
    console.error('Cache Error:', error);
    return next();
  }
};

module.exports = withCache;
