const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Neighborhood',
  tableName: 'neighborhood',
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
    //   spatialFeatureType: 'Point',
    //   srid: +process.env.SRID,
    //   nullable: false,
    // },
  },
});
