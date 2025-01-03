const express = require('express');
const main = require('controllers/main.controller');

const router = express.Router();

router.get('/', main);

module.exports = router;
