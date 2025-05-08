const DepartmentEntity = require('entities/Department');
const BaseRepository = require('./BaseRepository');

class DepartmentRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, DepartmentEntity);
  }
}

module.exports = DepartmentRepository;
