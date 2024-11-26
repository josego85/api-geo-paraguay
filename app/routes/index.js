const express = require('express');
const router = express.Router();
const main = require('./main.routes');
const departments = require('./department.routes');
const distrits = require('./distrit.routes');
const cities = require('./city.routes');
const neighborhoods = require('./neighborhood.routes');

router.use(main);
router.use(departments);
router.use(distrits);
router.use(cities);
router.use(neighborhoods);

module.exports = router;
