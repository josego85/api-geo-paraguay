const createList = (entity) => ({
  key: (req) => {
    const filters = req.processedQuery.filters || {};
    const filterString = Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .sort()
      .join(':');

    return `cache:${entity}:list:${filterString}:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`;
  },
  ttl: 3600,
});

const createSingle = (entity) => ({
  key: (req) => `cache:${entity}:single:${req.validatedId}`,
  ttl: 24 * 3600,
});

module.exports = {
  createList,
  createSingle,
};
