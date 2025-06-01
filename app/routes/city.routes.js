const express = require('express');
const cityController = require('controllers/cityController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/cities',
  queryParser,
  cacheResponse({
    key: (req) =>
      `cities:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}:name=${req.processedQuery.name || ''}`,
    ttl: 3600, // one hour
  }),
  cityController.getCities,
);

router.get(
  '/cities/:id',
  cacheResponse({
    key: (req) => `cities:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  cityController.getCityById,
);

module.exports = router;
