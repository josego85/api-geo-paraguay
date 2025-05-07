const geoCacheService = require('services/geoCacheService');
const departmentService = require('services/departmentService');
const Department = require('models/department.model');
const createController = require('./baseController');

const { getAll, getById } = createController({
  service: departmentService,
  namePlural: 'Departments',
  nameSingular: 'Department',
});

exports.getDepartments = getAll;

exports.getDepartmentById = getById;

exports.findByLngLat = async (req, res) => {
  try {
    const { lng, lat } = req.params;

    if (!lng || !lat) {
      return res.status(400).send({ message: 'Longitude and latitude are required' });
    }

    // Check if the data is already cached.
    const cachedData = await geoCacheService.getCachedLocation(lng, lat);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const data = await Department.findByLngLat(lng, lat);

    if (!data) {
      return res.status(404).send({ message: 'Departments not found' });
    }

    // Update cache.
    geoCacheService.cacheLocation(lng, lat, data).catch((error) => console.error('Error: ', error));

    return res.status(200).json(data);
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot.t('failed_to_retrieve_department') || error.message,
    });
  }
};
