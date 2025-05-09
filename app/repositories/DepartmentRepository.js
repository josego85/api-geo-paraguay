const BaseRepository = require('./BaseRepository');
const DepartmentEntity = require('../entities/Department');
const DistrictEntity = require('../entities/District');
const CityEntity = require('../entities/City');
const NeighborhoodEntity = require('../entities/Neighborhood');
const config = require('../config');

class DepartmentRepository extends BaseRepository {
  constructor(dataSource) {
    super(dataSource, DepartmentEntity);
  }

  /**
   * Given longitude & latitude, returns the department, district,
   * city and neighborhood that contain that point.
   *
   * @param {number|string} lng – Longitude
   * @param {number|string} lat – Latitude
   * @returns {Promise<{
   *   department_name: string,
   *   department_capital: string,
   *   district_name: string,
   *   city_name: string,
   *   neighborhood_name: string
   * }>}
   */
  async findByLngLat(lng, lat) {
    const lngNum = Number(lng);
    const latNum = Number(lat);
    if (!Number.isFinite(lngNum) || !Number.isFinite(latNum)) {
      throw new Error('Invalid coordinates');
    }

    const { srid } = config.db;
    const qb = this.repo
      .createQueryBuilder('dep')
      .setParameters({ lng: lngNum, lat: latNum, srid })
      .select([
        'dep.name           AS department_name',
        'dep.capital_name   AS department_capital',
        'dis.name           AS district_name',
        'ciu.name           AS city_name',
        'ba.name            AS neighborhood_name',
      ])
      // LEFT JOIN district dis ON ST_Contains(dis.geom, POINT)
      .leftJoin(
        DistrictEntity,
        'dis',
        `ST_Contains(
          dis.geom,
          ST_GeomFromText(CONCAT('POINT(', :lng, ' ', :lat, ')'), :srid)
        )`
      )
      // LEFT JOIN city ciu ON ST_Contains(ciu.geom, POINT)
      .leftJoin(
        CityEntity,
        'ciu',
        `ST_Contains(
          ciu.geom,
          ST_GeomFromText(CONCAT('POINT(', :lng, ' ', :lat, ')'), :srid)
        )`
      )
      // LEFT JOIN neighborhood ba ON ST_Contains(ba.geom, POINT)
      .leftJoin(
        NeighborhoodEntity,
        'ba',
        `ST_Contains(
          ba.geom,
          ST_GeomFromText(CONCAT('POINT(', :lng, ' ', :lat, ')'), :srid)
        )`
      )
      // WHERE ST_Contains(dep.geom, POINT)
      .where(
        `ST_Contains(
          dep.geom,
          ST_GeomFromText(CONCAT('POINT(', :lng, ' ', :lat, ')'), :srid)
        )`
      )
      // AND ST_Contains(ciu.geom, POINT)
      .andWhere(
        `ST_Contains(
          ciu.geom,
          ST_GeomFromText(CONCAT('POINT(', :lng, ' ', :lat, ')'), :srid)
        )`
      );

    const result = await qb.getRawOne();
    if (!result) {
      throw new Error('Location not found for those coordinates');
    }

    return result;
  }
}

module.exports = DepartmentRepository;
