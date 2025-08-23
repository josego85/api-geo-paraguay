const { EntitySchema } = require('typeorm');
const BaseColumns = require('./BaseColumns');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'city',
  columns: {
    ...BaseColumns,
  },
});
