const Neighborhood = require('models/neighborhood.model');
const NeighborhoodService = require('services/neighborhoodService');

exports.getNeighborhoods = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder } = req.processedQuery;
    const options = {
      page,
      limit,
      sort: { field: sortField, order: sortOrder },
    };
    const data = await NeighborhoodService.findAll(options);

    if (!data || data.length === 0) {
      return res.status(404).send({ message: 'Neighborhoods not found' });
    }

    return res.status(200).json({ data, page, limit });
  } catch (error) {
    return res.status(500).send({
      message: req.polyglot.t('failed_to_retrieve_neighborhoods') || error.message,
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

exports.getNeighborhoodById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    const data = await Neighborhood.findById(id);

    if (!data) {
      return res.status(404).send({ message: 'Neighborhood not found' });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot.t('failed_to_retrieve_neighborhood') || error.message,
    });
  }
};
