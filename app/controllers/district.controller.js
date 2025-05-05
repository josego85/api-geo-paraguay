const District = require('models/district.model');

// Retrieve all districts.
exports.findAll = async (request, response) => {
  try {
    const data = await District.getAll(request.sorting);

    if (!data) {
      return response.status(404).send({ message: 'Districts not found' });
    }

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).send({
      message: request.polyglot.t('failed_to_retrieve_districts') || error.message,
    });
  }
};

// // Get longitude and latitude of a specific district.
// exports.getLngLat = async (request, response) => {
//   District.getLngLat(request.params, (err, data) => {
//     if (err) {
//       response.status(403).send({
//         message: request.polyglot.t('failed_to_retrieve_district') || err.message,
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

    const data = await District.findById(id);

    if (!data) {
      return response.status(404).send({ message: 'District not found' });
    }
    return response.status(200).json(data);
  } catch (error) {
    return response.status(403).send({
      message: request.polyglot.t('failed_to_retrieve_district') || error.message,
    });
  }
};
