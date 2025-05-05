const cacheService = require('services/cacheService');
const City = require('models/city.model');

exports.getCities = async (request, response) => {
  try {
    const data = await City.findAll(request.sorting);
    if (!data) {
      return response.status(404).send({ message: 'Cities not found' });
    }

    // Update cache if middleware provided cache info
    if (request.cacheInfo) {
      cacheService
        .set(request.cacheInfo.key, data)
        .catch((error) => console.error('Cache Error:', error));
    }

    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).send({
      message: request.polyglot.t('failed_to_retrieve_cities') || error.message,
    });
  }
};

// Get longitude and latitude of a specific city.
// exports.getLngLat = async (request, response) => {
//   City.getLngLat(request.params, (err, data) => {
//     if (err) {
//       response.status(403).send({
//         message: request.polyglot.t('failed_to_retrieve_city') || err.message,
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

exports.getCityById = async (request, response) => {
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
