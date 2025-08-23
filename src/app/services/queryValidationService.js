const ALLOWED_FILTER_FIELDS = require('config/filterFields.config');
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
    const resourceFilterConfig = ALLOWED_FILTER_FIELDS[resource];

    if (
      !resourceFilterConfig ||
      !resourceFilterConfig.fields ||
      resourceFilterConfig.fields.length === 0
    ) {
      return {};
    }

    return resourceFilterConfig.fields.reduce((acc, fieldName) => {
      if (query[fieldName] !== undefined) {
        const value = query[fieldName];
        if (typeof value === 'string') {
          acc[fieldName] = value.trim();
        } else {
          acc[fieldName] = value;
        }
      }
      return acc;
    }, {});
  },
};

module.exports = QueryValidationService;
