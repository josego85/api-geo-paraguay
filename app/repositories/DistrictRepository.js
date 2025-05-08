const DistrictEntity = require('entities/District');
const BaseRepository = require('./BaseRepository');

class NeighborhoodRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, DistrictEntity);
  }
}

module.exports = NeighborhoodRepository;
