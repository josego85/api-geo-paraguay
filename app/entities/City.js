const { EntitySchema } = require('typeorm');

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
    // geom: {
    //   type: 'geometry',
    //   spatialFeatureType: 'Point',
    //   srid: +process.env.SRID,
    //   nullable: false,
    // },
  },
});
