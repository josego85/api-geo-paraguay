const express = require('express');
const departmentController = require('controllers/department.controller');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/departamentos',
  queryParser,
  cacheResponse({
    key: (req) =>
      `departamentos:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`,
    ttl: 3600, // one hour
  }),
  departmentController.getDepartments
);
router.get(
  '/departamentos/:id',
  cacheResponse({
    key: (req) => `departamentos:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  departmentController.getDepartmentById
);
router.get('/departamentos/:lng/:lat', departmentController.findByLngLat);
router.use('/paraguay/:lng/:lat', departmentController.findByLngLat);

module.exports = router;
