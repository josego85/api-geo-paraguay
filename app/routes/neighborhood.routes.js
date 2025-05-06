const express = require('express');
const neighborhoodController = require('controllers/neighborhood.controller');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/barrios',
  queryParser,
  cacheResponse({
    key: (req) =>
      `barrios:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`,
    ttl: 3600, // one hour
  }),
  neighborhoodController.getNeighborhoods
);
router.get(
  '/barrios/:id',
  cacheResponse({
    key: (req) => `barrios:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  neighborhoodController.getNeighborhoodById
);
// router.get('/barrios/:name', neighborhoods.getLngLat);

module.exports = router;
