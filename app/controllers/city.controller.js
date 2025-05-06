const City = require('models/city.model');
const CityService = require('services/cityService');

exports.getCities = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder } = req.processedQuery;
    const options = {
      page,
      limit,
      sort: { field: sortField, order: sortOrder },
    };
    const data = await CityService.findAll(options);

    if (!data || data.length === 0) {
      return res.status(404).send({ message: 'Cities not found' });
    }

    return res.status(200).json({ data, page, limit });
  } catch (error) {
    return res.status(500).send({
      message: req.polyglot?.t('failed_to_retrieve_cities') || error.message,
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

exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    const data = await City.findById(id);

    if (!data) {
      return res.status(404).send({ message: 'City not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot?.t('failed_to_retrieve_city') || error.message,
    });
  }
};
