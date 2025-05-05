class CacheKeyService {
  static generateKey(resource, params = {}) {
    let key = resource;

    if (params.sorting) {
      const { field, order } = params.sorting;
      key += `:sort=${field}-${order}`;
    }

    return key;
  }
}

module.exports = CacheKeyService;
