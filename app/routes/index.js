const express = require('express');
const main = require('./main.routes');
const departments = require('./department.routes');
const districts = require('./district.routes');
const cities = require('./city.routes');
const neighborhoods = require('./neighborhood.routes');

const router = express.Router();

router.use(main);
router.use(departments);
router.use(districts);
router.use(cities);
router.use(neighborhoods);

module.exports = router;
