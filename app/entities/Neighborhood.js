const { EntitySchema } = require('typeorm');
const BaseColumns = require('./BaseColumns');

module.exports = new EntitySchema({
  name: 'Neighborhood',
  tableName: 'neighborhood',
  columns: {
    ...BaseColumns,
  },
});
