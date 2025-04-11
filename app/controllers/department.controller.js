const { save } = require('helpers/providers/cache/redisClient');
const Department = require('models/department.model');
const { saveGeoLocation, getGeoLocation } = require('helpers/providers/cache/geoCache');
const getCaching = require('./app.controller');

// Retrieve all departments.
exports.findAll = async (request, response) => {
  try {
    const field = 'departaments';
    const resultCache = await getCaching(field);

    if (resultCache) {
      return response.status(200).json({
        data: resultCache,
      });
    }

    const data = await Department.getAll();

    if (!data) {
      return response.status(404).send({ message: 'Departments not found' });
    }

    // Update cache.
    save(field, data).catch((error) => console.error('Error: ', error));

    return response.status(200).json({
      data,
    });
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('failed_to_retrieve_departments') || error.message,
    });
  }
};

exports.findByLngLat = async (request, response) => {
  try {
    const { lng, lat } = request.params;

    if (!lng || !lat) {
      return response.status(400).send({ message: 'Longitude and latitude are required' });
    }

    // Check if the data is already cached.
    const formCache = await getGeoLocation(lng, lat);
    if (formCache) {
      return response.status(200).json(formCache);
    }

    const data = await Department.findByLngLat(lng, lat);

    if (!data) {
      return response.status(404).send({ message: 'Departments not found' });
    }

    // Update cache.
    saveGeoLocation(lng, lat, data).catch((error) => console.error('Error: ', error));

    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('failed_to_retrieve_department') || error.message,
    });
  }
};

exports.findById = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id) {
      return response.status(400).send({ message: 'ID is required' });
    }

    const data = await Department.findById(id);

    if (!data) {
      return response.status(404).send({ message: 'Department not found' });
    }
    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('failed_to_retrieve_department') || error.message,
    });
  }
};
