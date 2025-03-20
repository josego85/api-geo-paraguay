const { save } = require('helpers/providers/cache/redisClient');
const Department = require('models/department.model');
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

// exports.findByLngLat = (request, response) => {
//   Department.findByLngLat(request.params, (err, data) => {
//     if (err) {
//       response.status(403).send({
//         message: request.polyglot.t('failed_to_retrieve_department') || err.message,
//       });
//     } else {
//       const json = {
//         success: true,
//         data,
//       };

//       response.status(200).json(json);
//     }
//   });
// };

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
