const express = require('express');
const districtController = require('controllers/district.controller');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/distritos',
  queryParser,
  cacheResponse({
    key: (req) =>
      `distritos:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`,
    ttl: 3600, // one hour
  }),
  districtController.getDistricts
);
router.get(
  '/distritos/:id',
  cacheResponse({
    key: (req) => `distritos:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  districtController.getDistrictById
);
// router.get('/distritos/:name', districts.getLngLat);

module.exports = router;
