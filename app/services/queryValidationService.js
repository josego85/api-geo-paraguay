const ValidationService = require('services/validationService');

const QueryValidationService = {
  processSorting(query, resource) {
    const sorting = {};

    // Validate and set sortField
    if (query.sortField) {
      if (!ValidationService.validateSortField(resource, query.sortField)) {
        throw new Error(`Invalid sortField for resource: ${resource}`);
      }
      sorting.sortField = query.sortField;
    } else {
      // Use default sortField if not provided
      const defaultSort = ValidationService.getDefaultSort(resource);
      sorting.sortField = defaultSort.field;
      sorting.sortOrder = defaultSort.order;
    }

    // Validate and set sortOrder if provided
    if (query.sortOrder) {
      sorting.sortOrder = query.sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    }

    return sorting;
  },

  processPagination(query) {
    const page = parseInt(query.page, 10);
    const limit = parseInt(query.limit, 10);

    return {
      page: Number.isInteger(page) && page > 0 ? page : 1,
      limit: Number.isInteger(limit) && limit > 0 ? limit : 10,
    };
  },

  processFilters(query, resource) {
    const filters = {};

    // Example: Filter for name
    if (
      (resource === 'cities' || resource === 'districts' || resource === 'neighborhoods') &&
      query.name
    ) {
      filters.name = query.name.trim();
    }

    // Add more filters for other resources as needed
    return filters;
  },
};

module.exports = QueryValidationService;
