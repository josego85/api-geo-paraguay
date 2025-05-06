const geoCacheService = require('services/geoCacheService');
const DepartmentService = require('services/departmentService');
const Department = require('models/department.model');

exports.getDepartments = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder, name, capital_name } = req.processedQuery;
    const options = {
      page,
      limit,
      sortField,
      sortOrder,
      filter: { name, capital_name },
    };
    const data = await DepartmentService.findAll(options);

    if (!data || data.length === 0) {
      return res.status(404).send({ message: 'Departments not found' });
    }

    return res.status(200).json({ data, page, limit });
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot.t('failed_to_retrieve_departments') || error.message,
    });
  }
};

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

exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    const data = await Department.findById(id);

    if (!data) {
      return res.status(404).send({ message: 'Department not found' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot.t('failed_to_retrieve_department') || error.message,
    });
  }
};
