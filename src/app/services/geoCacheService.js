const { saveGeoLocation, getGeoLocation } = require('helpers/providers/cache/geoCache');

const geoCacheService = {
  async getCachedLocation(lng, lat) {
    try {
      return await getGeoLocation(lng, lat);
    } catch (error) {
      console.error('GeoCache get error:', error);
      return null;
    }
  },
  async cacheLocation(lng, lat, data) {
    try {
      await saveGeoLocation(lng, lat, data);
    } catch (error) {
      console.error('GeoCache set error: ', error);
    }
  },
};

module.exports = geoCacheService;
