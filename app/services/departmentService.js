const BaseService = require('services/baseService');
const DepartmentRepository = require('repositories/DepartmentRepository');
const dataSource = require('config/data-source');

const departmentRepo = new DepartmentRepository(dataSource);

module.exports = new BaseService(departmentRepo);
