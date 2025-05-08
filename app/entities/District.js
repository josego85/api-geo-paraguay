const { EntitySchema } = require('typeorm');

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
    // geom: {
    //   type: 'geometry',
    //   spatialFeatureType: 'MultiPolygon',
    //   srid: +process.env.SRID,
    //   nullable: false,
    // },
  },
});
