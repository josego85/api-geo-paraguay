const { EntitySchema } = require('typeorm');

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
    // geom: {
    //   type: 'geometry',
    //   spatialFeatureType: 'MultiPolygon',
    //   srid: +process.env.SRID,
    //   nullable: false,
    // },
  },
});
