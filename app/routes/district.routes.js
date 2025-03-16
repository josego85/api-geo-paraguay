const express = require('express');
const districts = require('controllers/district.controller');

const router = express.Router();

router.get('/distritos', districts.findAll);
router.get('/distritos/:id', districts.findById);
// router.get('/distritos/:name', districts.getLngLat);

module.exports = router;
