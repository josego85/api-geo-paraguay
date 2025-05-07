const express = require('express');
const main = require('controllers/mainController');

const router = express.Router();

router.get('/', main);

module.exports = router;
