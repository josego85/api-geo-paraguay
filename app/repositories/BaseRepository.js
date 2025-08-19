class BaseRepository {
  constructor(dataSource, entity) {
    this.repo = dataSource.getRepository(entity);
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', filters = {} }) {
    const queryBuilder = this.repo.createQueryBuilder('entity');
    const metadata = this.repo.metadata;

    if (Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        const column = metadata.findColumnWithPropertyName(key);
        if (value != null && column) {
          if (typeof value === 'string') {
            queryBuilder.andWhere(`LOWER(entity.${key}) LIKE LOWER(:${key})`, {
              [key]: `%${value.trim()}%`,
            });
          } else {
            queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
          }
        } else {
          console.warn(`Ignoring filter for non-existent column: ${key}`);
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
