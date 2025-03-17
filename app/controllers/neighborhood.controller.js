const { save } = require('helpers/providers/cache/redisClient');
const Neighborhood = require('models/neighborhood.model');
const getCaching = require('./app.controller');

// Retrieve all neighborhood from the database.
exports.findAll = async (request, response) => {
  try {
    const field = 'neighborhood';
    const resultCache = await getCaching(field);

    if (resultCache) {
      return response.status(200).json({
        data: resultCache,
      });
    }

    const data = await Neighborhood.getAll();

    if (!data) {
      return response.status(404).send({ message: 'Neighborhoods not found' });
    }

    // Update cache.
    save(field, data).catch((error) => console.error('Error: ', error));

    return response.status(200).json({
      data,
    });
  } catch (error) {
    return response.status(500).send({
      message: request.polyglot.t('failed_to_retrieve_neighborhoods') || error.message,
    });
  }
};

// Get longitude and latitude of a specific neighborhood.
exports.getLngLat = async (request, response) => {
  Neighborhood.getLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('failed_to_retrieve_neighborhood') || err.message,
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

    const data = await Neighborhood.findById(id);

    if (!data) {
      return response.status(404).send({ message: 'Neighborhood not found' });
    }

    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('failed_to_retrieve_neighborhood') || error.message,
    });
  }
};
