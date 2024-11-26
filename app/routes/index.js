const express = require('express');
const main = require('./main.routes');
const departments = require('./department.routes');
const distrits = require('./distrit.routes');
const cities = require('./city.routes');
const neighborhoods = require('./neighborhood.routes');

const router = express.Router();

router.use(main);
router.use(departments);
router.use(distrits);
router.use(cities);
router.use(neighborhoods);

module.exports = router;
