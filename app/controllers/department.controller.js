const geoCacheService = require('services/geoCacheService');
const Department = require('models/department.model');

exports.findAll = async (request, response) => {
  try {
    const data = await Department.getAll(request.sorting);

    if (!data) {
      return response.status(404).send({ message: 'Departments not found' });
    }

    return response.status(200).json({ data });
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
    const cachedData = await geoCacheService.getCachedLocation(lng, lat);
    if (cachedData) {
      return response.status(200).json(cachedData);
    }

    const data = await Department.findByLngLat(lng, lat);

    if (!data) {
      return response.status(404).send({ message: 'Departments not found' });
    }

    // Update cache.
    geoCacheService.cacheLocation(lng, lat, data).catch((error) => console.error('Error: ', error));

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
