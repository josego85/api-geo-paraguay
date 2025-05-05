const express = require('express');

const cityController = require('controllers/city.controller');
const queryParser = require('middleware/queryParser');
const withCache = require('middleware/cacheMiddleware');

const router = express.Router();

router.get('/ciudades', queryParser, withCache('cities'), cityController.findAll);
router.get('/ciudades/:id', cityController.findById);
// router.get('/ciudades/:name', cities.getLngLat);

module.exports = router;
