const express = require('express');

const cityController = require('controllers/city.controller');
const queryParser = require('middleware/queryParser');
const withCache = require('middleware/cacheMiddleware');

const router = express.Router();

router.get('/ciudades', queryParser, withCache('cities'), cityController.getCities);
router.get('/ciudades/:id', cityController.getCityById);
// router.get('/ciudades/:name', cities.getLngLat);

module.exports = router;
