const express = require('express');
const districtController = require('controllers/districtController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');
const validateId = require('middleware/validateId.middleware');
const { createList, createSingle } = require('utils/cache');

const router = express.Router();

router.get(
  '/districts',
  queryParser,
  cacheResponse(createList('districts')),
  districtController.getDistricts,
);
router.get(
  '/districts/:id',
  validateId,
  cacheResponse(createSingle('districts')),
  districtController.getDistrictById,
);

module.exports = router;
