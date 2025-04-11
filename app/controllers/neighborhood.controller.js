const cacheService = require('services/cacheService');
const Neighborhood = require('models/neighborhood.model');

// Retrieve all neighborhood.
exports.findAll = async (request, response) => {
  try {
    const cacheKey = 'neighborhood';
    const cachedData = await cacheService.get(cacheKey);

    if (cachedData) {
      return response.status(200).json({
        data: cachedData,
      });
    }

    const data = await Neighborhood.getAll();

    if (!data) {
      return response.status(404).send({ message: 'Neighborhoods not found' });
    }

    // Update cache.
    cacheService.set(cacheKey, data).catch((error) => console.error('Error: ', error));

    return response.status(200).json({
      data,
    });
  } catch (error) {
    return response.status(500).send({
      message: request.polyglot.t('failed_to_retrieve_neighborhoods') || error.message,
    });
  }
};

// // Get longitude and latitude of a specific neighborhood.
// exports.getLngLat = async (request, response) => {
//   Neighborhood.getLngLat(request.params, (err, data) => {
//     if (err) {
//       response.status(403).send({
//         message: request.polyglot.t('failed_to_retrieve_neighborhood') || err.message,
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
