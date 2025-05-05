const ValidationService = require('services/validationService');

const queryParser = (req, res, next) => {
  try {
    const resource = req.path.split('/')[1];
    req.sorting = {};

    // Validate and set sortField
    if (req.query.sortField) {
      if (!ValidationService.validateSortField(resource, req.query.sortField)) {
        return res.status(400).json({
          error: `Invalid sortField for resource: ${resource}`,
        });
      }
      req.sorting.field = req.query.sortField;
    } else {
      // Use default sortField if not provided
      const defaultSort = ValidationService.getDefaultSort(resource);
      req.sorting.field = defaultSort.field;
      req.sorting.order = defaultSort.order;
    }

    // Validate and set sortOrder if provided
    if (req.query.sortOrder) {
      req.sorting.order = req.query.sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }

    // Validate and sanitize page and limit
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);

    req.pagination = {
      page: Number.isInteger(page) && page > 0 ? page : 1,
      limit: Number.isInteger(limit) && limit > 0 ? limit : 10,
    };

    // Store processed query parameters in a new property
    req.processedQuery = {
      sortField: req.sorting.field,
      sortOrder: req.sorting.order,
      page: req.pagination.page,
      limit: req.pagination.limit,
    };

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = queryParser;
