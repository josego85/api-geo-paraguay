const express = require('express');
const cityController = require('controllers/cityController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');
const validateId = require('middleware/validateId.middleware');
const { createList, createSingle } = require('utils/cache');

const router = express.Router();

router.get('/cities', queryParser, cacheResponse(createList('cities')), cityController.getCities);

router.get(
  '/cities/:id',
  validateId,
  cacheResponse(createSingle('cities')),
  cityController.getCityById,
);

module.exports = router;
