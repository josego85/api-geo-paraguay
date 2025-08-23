class ServiceResponse {
  constructor(data = [], metadata = {}) {
    if (!this.isValidData(data)) {
      throw new Error('Invalid data format');
    }

    this.data = Array.isArray(data) ? data : [];
    this.metadata = this.buildMetadata(metadata);
  }

  isValidData(data) {
    return data === null || Array.isArray(data) || typeof data === 'object';
  }

  buildMetadata(metadata) {
    const { total, page = 1, limit = 10 } = metadata;
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
      timestamp: new Date().toISOString(),
    };
  }

  static success(data, metadata = {}) {
    return new ServiceResponse(data, metadata);
  }

  static empty() {
    return new ServiceResponse([], { total: 0 });
  }

  static error(message) {
    return new ServiceResponse([], {
      error: message,
      total: 0,
    });
  }
}

module.exports = ServiceResponse;
