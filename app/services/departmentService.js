const BaseService = require('services/baseService');
const DepartmentRepository = require('repositories/DepartmentRepository');
const AppDataSource = require('database/data-source');

const departmentRepo = new DepartmentRepository(AppDataSource);

class DepartmentService extends BaseService {
  /**
   * Find the department, district, city, and neighborhood
   * containing the given coordinates
   * @param {number|string} lng - Longitude
   * @param {number|string} lat - Latitude
   * @returns {Promise<Object>} - Raw result with names
   */
  async findByLngLat(lng, lat) {
    return this.repository.findByLngLat(lng, lat);
  }
}

module.exports = new DepartmentService(departmentRepo);
