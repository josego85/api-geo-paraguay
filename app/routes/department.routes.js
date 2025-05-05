const express = require('express');

const departmentController = require('controllers/department.controller');
const queryParser = require('middleware/queryParser');
const withCache = require('middleware/cacheMiddleware');

const router = express.Router();

router.get('/departamentos', queryParser, withCache('departaments'), departmentController.findAll);
router.get('/departamentos/:id', departmentController.findById);
router.get('/departamentos/:lng/:lat', departmentController.findByLngLat);
router.use('/paraguay/:lng/:lat', departmentController.findByLngLat);

module.exports = router;
