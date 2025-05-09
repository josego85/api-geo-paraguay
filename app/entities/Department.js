const { EntitySchema } = require('typeorm');
const {
  db: { srid },
} = require('config');

module.exports = new EntitySchema({
  name: 'Department',
  tableName: 'department',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    capital_name: {
      type: String,
    },
    geom: {
      type: 'geometry',
      spatialFeatureType: 'MultiPolygon',
      srid,
      nullable: false,
      select: false,
    },
  },
});
