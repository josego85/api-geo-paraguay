const express = require('express');
const cityController = require('controllers/city.controller');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/ciudades',
  queryParser,
  cacheResponse({
    key: (req) =>
      `ciudades:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`,
    ttl: 3600, // one hour
  }),
  cityController.getCities
);

router.get(
  '/ciudades/:id',
  cacheResponse({
    key: (req) => `ciudades:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  cityController.getCityById
);

module.exports = router;
