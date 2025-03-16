const { save } = require('helpers/providers/cache/redisClient');
const Department = require('models/department.model');
const getCaching = require('./app.controller');

// Retrieve all departments from the database.
exports.findAll = async (request, response) => {
  const field = 'departaments';
  const resultCache = await getCaching(field);

  if (resultCache) {
    response.status(200).json({
      success: true,
      data: resultCache,
    });

    return;
  }

  Department.getAll((err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('not_retrieve_department') || err.message,
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

exports.findByLngLat = (request, response) => {
  Department.findByLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t('not_retrieve_department') || err.message,
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

    const data = await Department.findById(id);

    if (!data) {
      return response.status(404).send({ message: 'Department not found' });
    }
    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('not_retrieve_department') || error.message,
    });
  }
};
