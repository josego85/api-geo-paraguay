const { Like } = require('typeorm');

class BaseRepository {
  constructor(dataSource, entity) {
    this.repo = dataSource.getRepository(entity);
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filters }) {
    const queryBuilder = this.repo.createQueryBuilder('entity');

    // Apply filters if they exist and are valid columns
    if (Object.keys(filters).length > 0) {
      const metadata = this.repo.metadata;
      Object.entries(filters).forEach(([key, value]) => {
        if (value != null && metadata.findColumnWithPropertyName(key)) {
          if (typeof value === 'string') {
            queryBuilder.andWhere(`entity.${key} LIKE :${key}`, { [key]: `%${value}%` });
          } else {
            queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
          }
        }
      });
    }

    // Add ordering using valid column
    if (this.repo.metadata.findColumnWithPropertyName(sortField)) {
      queryBuilder.orderBy(`entity.${sortField}`, sortOrder);
    }

    // Add pagination
    const [data, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findById(id) {
    const entity = await this.repo.findOneBy({ id: Number(id) });
    if (!entity) {
      throw new Error(`${this.repo.metadata.name} not found`);
    }
    return entity;
  }
}

module.exports = BaseRepository;
