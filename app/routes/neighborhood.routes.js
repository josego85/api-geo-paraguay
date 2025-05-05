const express = require('express');

const neighborhoodController = require('controllers/neighborhood.controller');
const queryParser = require('middleware/queryParser');
const withCache = require('middleware/cacheMiddleware');

const router = express.Router();

router.get('/barrios', queryParser, withCache('neighborhood'), neighborhoodController.findAll);
router.get('/barrios/:id', neighborhoodController.findById);
// router.get('/barrios/:name', neighborhoods.getLngLat);

module.exports = router;
