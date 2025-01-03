const { save } = require('helpers/providers/cache/redisClient');
const City = require('models/city.model');
const getCaching = require('./app.controller');

// Retrieve all city from the database.
exports.findAll = async (request, response) => {
  const field = 'cities';
  const resultCache = await getCaching(field);

  if (resultCache) {
    response.status(200).json({
      success: true,
      data: resultCache,
    });

    return;
  }

  City.getAll((err, data) => {
    if (err) {
      response.status(500).send({
        message: err.message || 'Some error occurred while retrieving city.',
      });
    } else {
      // Update cache.
      save(field, data).catch((error) => console.error('Error: ', error));

      const json = {
        success: true,
        data,
      };
      response.status(200).json(json);
    }
  });
};

// Get longitude and latitude of a specific city.
exports.getLngLat = async (request, response) => {
  City.getLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('not_retrieve_city') || err.message,
      });
    } else {
      const json = {
        success: true,
        data,
      };
      response.status(200).json(json);
    }
  });
};
