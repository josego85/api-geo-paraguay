const express = require('express');
const neighborhoodController = require('controllers/neighborhoodController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');
const validateId = require('middleware/validateId.middleware');
const { createList, createSingle } = require('utils/cache');

const router = express.Router();

router.get(
  '/neighborhoods',
  queryParser,
  cacheResponse(createList('neighborhoods')),
  neighborhoodController.getNeighborhoods,
);
router.get(
  '/neighborhoods/:id',
  validateId,
  cacheResponse(createSingle('neighborhoods')),
  neighborhoodController.getNeighborhoodById,
);

module.exports = router;
