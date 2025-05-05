const ALLOWED_SORT_FIELDS = {
  departamentos: {
    fields: ['departamento_id', 'departamento_nombre', 'departamento_capital'],
    defaultSort: { field: 'departamento_id', order: 'ASC' },
  },
  distritos: {
    fields: ['distrito_id', 'distrito_nombre'],
    defaultSort: { field: 'distrito_id', order: 'ASC' },
  },
  ciudades: {
    fields: ['ciudad_id', 'ciudad_nombre'],
    defaultSort: { field: 'ciudad_id', order: 'ASC' },
  },
  barrios: {
    fields: ['barrio_id', 'barrio_nombre'],
    defaultSort: { field: 'barrio_id', order: 'ASC' },
  },
};

module.exports = ALLOWED_SORT_FIELDS;
