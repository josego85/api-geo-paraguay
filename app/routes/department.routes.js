const express = require('express');
const departments = require('controllers/department.controller');

const router = express.Router();

router.use('/paraguay/:lng/:lat', departments.findByLngLat);
router.get('/departamentos', departments.findAll);
router.get('/departamentos/:id', departments.findById);
router.get('/departamentos/:lng/:lat', departments.findByLngLat);

module.exports = router;
