class PaginationResponse {
  constructor(data = [], { total = 0, page = 1, limit = 10 } = {}) {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array');
    }

    this.data = data;
    this.metadata = this.buildMetadata(total, page, limit);
  }

  buildMetadata(total, page, limit) {
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  static createEmpty() {
    return new PaginationResponse();
  }

  static createFromRepository(data, total, page, limit) {
    return new PaginationResponse(data, { total, page, limit });
  }
}

module.exports = PaginationResponse;
