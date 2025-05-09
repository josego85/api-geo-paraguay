const { EntitySchema } = require('typeorm');
const {
  db: { srid },
} = require('config');

module.exports = new EntitySchema({
  name: 'City',
  tableName: 'city',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
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
