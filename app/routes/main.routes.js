'use strict';

const express = require('express');
const router = express.Router();
const main = require('controllers/main.controller.js');

router.get('/', main);

module.exports = router;
