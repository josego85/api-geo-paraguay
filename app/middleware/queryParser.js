const QueryValidationService = require('services/queryValidationService');

const queryParser = (req, res, next) => {
  try {
    const resource = req.path.split('/')[1];

    // Validate and process sorting
    const sorting = QueryValidationService.processSorting(req.query, resource);

    // Validate and process pagination
    const pagination = QueryValidationService.processPagination(req.query);

    // Validate and process filters
    const filters = QueryValidationService.processFilters(req.query, resource);

    // Store processed query parameters in a new property
    req.processedQuery = {
      ...sorting,
      ...pagination,
      ...filters,
    };

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = queryParser;
