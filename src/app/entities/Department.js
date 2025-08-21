const { EntitySchema } = require('typeorm');
const BaseColumns = require('./BaseColumns');

module.exports = new EntitySchema({
  name: 'Department',
  tableName: 'department',
  columns: {
    ...BaseColumns,
    capital_name: {
      type: String,
    },
  },
});
