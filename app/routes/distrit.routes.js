const express = require('express');
const distrits = require('controllers/distrit.controller.js');

const router = express.Router();

router.get('/distritos', distrits.findAll);
router.get('/distritos/:name', distrits.getLngLat);

module.exports = router;
