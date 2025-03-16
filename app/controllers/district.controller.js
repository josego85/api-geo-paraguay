const { save } = require('helpers/providers/cache/redisClient');
const District = require('models/district.model');
const getCaching = require('./app.controller');

// Retrieve all districts from the database.
exports.findAll = async (request, response) => {
  const field = 'districts';
  const resultCache = await getCaching(field);

  if (resultCache) {
    response.status(200).json({
      success: true,
      data: resultCache,
    });

    return;
  }

  District.getAll((err, data) => {
    if (err) {
      response.status(500).send({
        message: err.message || 'Some error occurred while retrieving district.',
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

// Get longitude and latitude of a specific district.
exports.getLngLat = async (request, response) => {
  District.getLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('not_retrieve_district') || err.message,
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

exports.findById = (request, response) => {
  District.findById(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('not_retrieve_district') || err.message,
      });
    } else {
      response.status(200).json(data);
    }
  });
};