const express = require('express');

const districtController = require('controllers/district.controller');
const queryParser = require('middleware/queryParser');
const withCache = require('middleware/cacheMiddleware');

const router = express.Router();

router.get('/distritos', queryParser, withCache('districts'), districtController.findAll);
router.get('/distritos/:id', districtController.findById);
// router.get('/distritos/:name', districts.getLngLat);

module.exports = router;
