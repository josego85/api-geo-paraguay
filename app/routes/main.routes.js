const express = require('express');
const main = require('controllers/main.controller.js');

const router = express.Router();

router.get('/', main);

module.exports = router;
