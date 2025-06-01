const express = require('express');
const departmentController = require('controllers/departmentController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');

const router = express.Router();

router.get(
  '/departments',
  queryParser,
  cacheResponse({
    key: (req) =>
      `departments:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}:name=${req.processedQuery.name || ''}:capital_name=${req.processedQuery.capital_name || ''}`,
    ttl: 3600, // one hour
  }),
  departmentController.getDepartments,
);
router.get(
  '/departments/:id',
  cacheResponse({
    key: (req) => `departments:id=${req.params.id}`,
    ttl: 3600, // one hour
  }),
  departmentController.getDepartmentById,
);
router.get('/departments/:lng/:lat', departmentController.findByLngLat);
router.get('/paraguay/:lng/:lat', departmentController.findByLngLat);

module.exports = router;
