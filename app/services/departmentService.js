const BaseService = require('services/baseService');
const DepartmentRepository = require('repositories/DepartmentRepository');
const AppDataSource = require('database/data-source');

const departmentRepo = new DepartmentRepository(AppDataSource);

module.exports = new BaseService(departmentRepo);
