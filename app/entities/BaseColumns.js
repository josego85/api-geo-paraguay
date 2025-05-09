const {
  db: { srid },
} = require('../config');

module.exports = {
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
};
