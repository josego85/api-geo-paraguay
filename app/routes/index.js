'use strict';

const express = require('express');
const router = express.Router();
const departments = require('../controllers/department.controller.js');
const distrits = require('../controllers/distrit.controller.js');
const cities = require('../controllers/city.controller.js');

// All the routes.
router.get('/paraguay/:lng/:lat', departments.findByLngLat);

// Departments.
router.get('/departamentos', departments.findAll);
router.get('/departamentos/:lng/:lat', departments.findByLngLat);

// Distrits.
router.get('/distritos', distrits.findAll);

// Cities.
router.get('/ciudades', cities.findAll);

module.exports = router;