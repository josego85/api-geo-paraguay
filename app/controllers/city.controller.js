const { save } = require('helpers/providers/cache/redisClient');
const City = require('models/city.model');
const getCaching = require('./app.controller');

// Retrieve all city.
exports.findAll = async (request, response) => {
  try {
    const field = 'cities';
    const resultCache = await getCaching(field);

    if (resultCache) {
      return response.status(200).json({
        data: resultCache,
      });
    }

    const data = await City.getAll();

    if (!data) {
      return response.status(404).send({ message: 'Cities not found' });
    }

    // Update cache.
    save(field, data).catch((error) => console.error('Error: ', error));

    return response.status(200).json({
      data,
    });
  } catch (error) {
    return response.status(500).send({
      message: request.polyglot.t('failed_to_retrieve_cities') || error.message,
    });
  }
};

// Get longitude and latitude of a specific city.
exports.getLngLat = async (request, response) => {
  City.getLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('failed_to_retrieve_city') || err.message,
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

exports.findById = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).send({ message: 'ID is required' });
    }

    const data = await City.findById(id);

    if (!data) {
      return response.status(404).send({ message: 'City not found' });
    }

    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot?.t('failed_to_retrieve_city') || error.message,
    });
  }
};
