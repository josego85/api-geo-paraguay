const express = require('express');

const router = express.Router();
const cities = require('controllers/city.controller');

router.get('/ciudades', cities.findAll);
router.get('/ciudades/:id', cities.findById);
// router.get('/ciudades/:name', cities.getLngLat);

module.exports = router;
