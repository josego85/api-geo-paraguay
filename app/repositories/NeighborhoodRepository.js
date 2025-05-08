const NeighborhoodEntity = require('entities/Neighborhood');
const BaseRepository = require('./BaseRepository');

class NeighborhoodRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, NeighborhoodEntity);
  }
}

module.exports = NeighborhoodRepository;
