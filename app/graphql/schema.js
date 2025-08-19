const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const DepartmentService = require('services/departmentService');
const DistrictService = require('services/districtService');
const CityService = require('services/cityService');
const NeighborhoodService = require('services/neighborhoodService');

const DepartmentType = require('./types/DepartmentType');
const DistrictType = require('./types/DistrictType');
const CityType = require('./types/CityType');
const NeighborhoodType = require('./types/NeighborhoodType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    departments: {
      type: new GraphQLList(DepartmentType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const result = await DepartmentService.findAll(args);
          if (!result || !result.data) {
            throw new Error('No departments found');
          }
          return result.data;
        } catch (error) {
          console.error('GraphQL departments error:', error);
          throw error;
        }
      },
    },
    department: {
      type: DepartmentType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => DepartmentService.findById(args.id),
    },
    districts: {
      type: new GraphQLList(DistrictType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const result = await DistrictService.findAll(args);
          if (!result || !result.data) {
            throw new Error('No districts found');
          }
          return result.data;
        } catch (error) {
          console.error('GraphQL districts error:', error);
          throw error;
        }
      },
    },
    district: {
      type: DistrictType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => DistrictService.findById(args.id),
    },
    cities: {
      type: new GraphQLList(CityType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const result = await CityService.findAll(args);
          if (!result || !result.data) {
            throw new Error('No cities found');
          }
          return result.data;
        } catch (error) {
          console.error('GraphQL cities error:', error);
          throw error;
        }
      },
    },
    city: {
      type: CityType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => CityService.findById(args.id),
    },
    neighborhoods: {
      type: new GraphQLList(NeighborhoodType),
      args: {
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sortField: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        try {
          const result = await NeighborhoodService.findAll(args);
          if (!result || !result.data) {
            throw new Error('No neighborhoods found');
          }
          return result.data;
        } catch (error) {
          console.error('GraphQL neighborhoods error:', error);
          throw error;
        }
      },
    },
    neighborhood: {
      type: NeighborhoodType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => NeighborhoodService.findById(args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
