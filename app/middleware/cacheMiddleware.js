const { redisClient } = require('helpers/providers/cache/redisClient');

module.exports = function cacheResponse(options) {
  const {
    key: getKey, // string | (req) => string
    ttl = 3600, // time-to-live in seconds
  } = options;

  return async function (req, res, next) {
    try {
      // 1) Calculate the key
      const key = typeof getKey === 'function' ? getKey(req) : getKey;

      // 2) Try to read from the cache
      const cached = await redisClient.get(key);
      if (cached) {
        console.log(`[cache] Cache hit for key: ${key}`);
        return res.json(JSON.parse(cached)); // Return cached response
      }

      // 3) Intercept res.json
      const originalJson = res.json.bind(res);
      res.json = async (body) => {
        // Send to the client
        originalJson(body);

        // Save to cache (asynchronous, errors do not block)
        try {
          await redisClient.set(key, JSON.stringify(body), 'EX', ttl);
          console.log(`[cache] Cache set for key: ${key}`);
        } catch (err) {
          console.error('[cache] Error saving to cache:', err);
        }
      };

      // 4) Continue with the controller
      next();
    } catch (err) {
      console.error('[cache] Error in middleware:', err);
      next(err);
    }
  };
};
