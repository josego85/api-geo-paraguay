const express = require('express');
const departmentController = require('controllers/departmentController');
const queryParser = require('middleware/queryParser');
const cacheResponse = require('middleware/cacheMiddleware');
const validateId = require('middleware/validateId.middleware');

const router = express.Router();

router.get(
  '/departments',
  queryParser,
  cacheResponse({
    key: (req) => {
      const filters = req.processedQuery.filters || {};
      const filterString = Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .sort()
        .join(':');

      return `departments:${filterString}:sortField=${req.processedQuery.sortField}:sortOrder=${req.processedQuery.sortOrder}:page=${req.processedQuery.page}:limit=${req.processedQuery.limit}`;
    },
    ttl: 3600, // one hour
  }),
  departmentController.getDepartments,
);
router.get(
  '/departments/:id',
  validateId,
  cacheResponse({
    key: (req) => `cache:departments:single:${req.validatedId}`,
    ttl: 24 * 3600, // 24 hours for single items since
  }),
  departmentController.getDepartmentById,
);
router.get('/departments/:lng/:lat', departmentController.findByLngLat);
router.get('/paraguay/:lng/:lat', departmentController.findByLngLat);

module.exports = router;
