const express = require('express');
const neighborhoods = require('controllers/neighborhood.controller');

const router = express.Router();

router.get('/barrios', neighborhoods.findAll);
router.get('/barrios/:id', neighborhoods.findById);
// router.get('/barrios/:name', neighborhoods.getLngLat);

module.exports = router;
