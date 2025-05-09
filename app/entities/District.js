const { EntitySchema } = require('typeorm');
const {
  db: { srid },
} = require('config');

module.exports = new EntitySchema({
  name: 'District',
  tableName: 'district',
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
