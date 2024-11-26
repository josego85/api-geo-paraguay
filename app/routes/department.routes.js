const express = require('express');
const router = express.Router();
const departments = require('controllers/department.controller.js');

router.use('/paraguay/:lng/:lat', departments.findByLngLat);
router.get('/departamentos', departments.findAll);
router.get('/departamentos/:id', departments.findById);
router.get('/departamentos/:lng/:lat', departments.findByLngLat);

module.exports = router;
