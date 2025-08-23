const ALLOWED_FILTER_FIELDS = {
  departments: {
    fields: ['name', 'capital_name'],
  },
  districts: {
    fields: ['name'],
  },
  cities: {
    fields: ['name'],
  },
  neighborhoods: {
    fields: ['name'],
  },
};

module.exports = ALLOWED_FILTER_FIELDS;
