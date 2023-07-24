'use strict';

const express = require('express');
const router = express.Router();
const neighborhoods = require('controllers/neighborhood.controller.js');

router.get('/barrios', neighborhoods.findAll);
router.get('/barrios/:name', neighborhoods.getLngLat);

module.exports = router;
