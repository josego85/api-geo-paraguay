const ALLOWED_SORT_FIELDS = require('../config/sortFields.config');

class ValidationService {
  static #validateResource(resource) {
    const config = ALLOWED_SORT_FIELDS[resource];
    if (!config) {
      throw new Error(
        `Invalid resource: ${resource}. Available resources: ${Object.keys(ALLOWED_SORT_FIELDS).join(', ')}`
      );
    }
    return config;
  }

  static #sanitizeField(field) {
    // Only allow alphanumeric and underscores
    if (!/^[a-zA-Z0-9_]+$/.test(field)) {
      throw new Error('Invalid field name: must contain only letters, numbers and underscores');
    }
    return field;
  }

  static validateSortField(resource, field) {
    const config = this.#validateResource(resource);
    const sanitizedField = this.#sanitizeField(field);

    if (!config.fields.includes(sanitizedField)) {
      throw new Error(
        `Invalid sort field. Allowed fields for ${resource}: ${config.fields.join(', ')}`
      );
    }
    return true;
  }

  static getDefaultSort(resource) {
    const config = this.#validateResource(resource);
    return config.defaultSort;
  }
}

module.exports = ValidationService;
