'use strict';

const express = require('express');
const router = express.Router();
const departments = require("../controllers/department.controller.js");

// All the routes.

// Sample1: http://localhost:3000/api/v1/departamentos/-56.987/-25.564
// Sample2: http://localhost:3000/api/v1/departamentos/-59.517228974/-23.8302210107
router.get('/departamentos/:lng/:lat', departments.findByLngLat);

// Show all departaments | GET
// Sample: http://localhost:3000/api/v1/departamentos
router.get('/departamentos', departments.findAll);

module.exports = router;