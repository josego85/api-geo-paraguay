"use strict";

const express       = require("express");
const router        = express.Router();
const welcome       = require("controllers/main.controller.js");
const departments   = require("controllers/department.controller.js");
const distrits      = require("controllers/distrit.controller.js");
const cities        = require("controllers/city.controller.js");
const neighborhoods = require("controllers/neighborhood.controller.js");

router.get("/", welcome);
router.get("/paraguay/:lng/:lat", departments.findByLngLat);
router.get("/departamentos", departments.findAll);
router.get("/departamentos/:lng/:lat", departments.findByLngLat);
router.get("/distritos", distrits.findAll);
router.get("/distritos/:name", distrits.getLngLat);
router.get("/ciudades", cities.findAll);
router.get("/ciudades/:name", cities.getLngLat);
router.get("/barrios", neighborhoods.findAll);
router.get("/barrios/:name", neighborhoods.getLngLat);

module.exports = router;