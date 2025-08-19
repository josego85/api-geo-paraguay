const express = require('express');
const departmentController = require('controllers/departmentController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');
const validateId = require('middleware/validateId.middleware');
const { createList, createSingle } = require('utils/cache');

const router = express.Router();

router.get(
  '/departments',
  queryParser,
  cacheResponse(createList('departments')),
  departmentController.getDepartments,
);
router.get(
  '/departments/:id',
  validateId,
  cacheResponse(createSingle('departments')),
  departmentController.getDepartmentById,
);
router.get('/departments/:lng/:lat', departmentController.findByLngLat);
router.get('/paraguay/:lng/:lat', departmentController.findByLngLat);

module.exports = router;
