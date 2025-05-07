const express = require('express');
const districtController = require('controllers/districtController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/districts',
  queryParser,
  cacheResponse({
    key: (req) =>
      `districts:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}:name=${req.processedQuery.name || ''}`,
    ttl: 3600, // one hour
  }),
  districtController.getDistricts
);
router.get(
  '/districts/:id',
  cacheResponse({
    key: (req) => `districts:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  districtController.getDistrictById
);

module.exports = router;
