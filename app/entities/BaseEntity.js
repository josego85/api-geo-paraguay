const { EntitySchema } = require('typeorm');
const BaseColumns = require('./BaseColumns');

module.exports = new EntitySchema({
  name: 'BaseEntity',
  columns: BaseColumns,
});
