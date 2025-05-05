const ValidationService = require('../services/validationService');

const queryParser = (req, res, next) => {
  try {
    const resource = req.path.split('/')[1];
    req.sorting = {};

    if (req.query.sort) {
      const [field, order] = req.query.sort.split(':');

      if (!ValidationService.validateSortField(resource, field)) {
        return res.status(400).json({
          error: `Invalid sort configuration for resource: ${resource}`,
        });
      }

      req.sorting = {
        field,
        order: order?.toLowerCase() === 'desc' ? 'DESC' : 'ASC',
      };
    } else {
      req.sorting = ValidationService.getDefaultSort(resource);
    }

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = queryParser;
