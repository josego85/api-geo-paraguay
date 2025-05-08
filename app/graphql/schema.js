const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');

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
      resolve: async () => {
        try {
          return await DepartmentService.findAll();
        } catch (error) {
          console.error('GraphQL error in departments resolver:', error);
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
      resolve: async () => {
        try {
          return await DistrictService.findAll();
        } catch (error) {
          console.error('GraphQL error in districts resolver:', error);
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
      resolve: async () => {
        try {
          return await CityService.findAll();
        } catch (error) {
          console.error('GraphQL error in cities resolver:', error);
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
      resolve: async () => {
        try {
          return await NeighborhoodService.findAll();
        } catch (error) {
          console.error('GraphQL error in neighborhoods resolver:', error);
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
