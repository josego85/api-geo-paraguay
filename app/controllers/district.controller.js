const District = require('models/district.model');
const DistrictService = require('services/districtService');

exports.getDistricts = async (req, res) => {
  try {
    const { page, limit, sortField, sortOrder } = req.processedQuery;
    const options = {
      page,
      limit,
      sort: { field: sortField, order: sortOrder },
    };
    const data = await DistrictService.findAll(options);

    if (!data || data.length === 0) {
      return res.status(404).send({ message: 'Districts not found' });
    }

    return res.status(200).json({ data, page, limit });
  } catch (error) {
    return res.status(500).send({
      message: req.polyglot.t('failed_to_retrieve_districts') || error.message,
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

exports.getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: 'ID is required' });
    }

    const data = await District.findById(id);

    if (!data) {
      return res.status(404).send({ message: 'District not found' });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(403).send({
      message: req.polyglot.t('failed_to_retrieve_district') || error.message,
    });
  }
};
