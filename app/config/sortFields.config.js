const ALLOWED_SORT_FIELDS = {
  departments: {
    fields: ['id', 'name', 'capital_name'],
    defaultSort: { field: 'id', order: 'ASC' },
  },
  distritos: {
    fields: ['id', 'name'],
    defaultSort: { field: 'id', order: 'ASC' },
  },
  cities: {
    fields: ['id', 'name'],
    defaultSort: { field: 'id', order: 'ASC' },
  },
  neighborhoods: {
    fields: ['id', 'name'],
    defaultSort: { field: 'id', order: 'ASC' },
  },
};

module.exports = ALLOWED_SORT_FIELDS;
