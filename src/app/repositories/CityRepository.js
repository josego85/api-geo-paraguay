const CityEntity = require('entities/City');
const BaseRepository = require('./BaseRepository');

class CityRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, CityEntity);
  }
}

module.exports = CityRepository;
