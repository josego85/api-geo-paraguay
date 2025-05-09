const { EntitySchema } = require('typeorm');
const BaseColumns = require('./BaseColumns');

module.exports = new EntitySchema({
  name: 'District',
  tableName: 'district',
  columns: {
    ...BaseColumns,
  },
});
