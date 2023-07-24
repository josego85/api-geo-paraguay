'use strict';

const express = require('express');
const router = express.Router();
const distrits = require('controllers/distrit.controller.js');

router.get('/distritos', distrits.findAll);
router.get('/distritos/:name', distrits.getLngLat);

module.exports = router;
