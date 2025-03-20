const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const Department = require('models/department.model');
const District = require('models/district.model');
const City = require('models/city.model');
const Neighborhood = require('models/neighborhood.model');
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
          return await Department.getAll();
        } catch (error) {
          console.error('GraphQL error in departments resolver:', error);
          throw error;
        }
      },
    },
    department: {
      type: DepartmentType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => Department.findById(args.id),
    },
    districts: {
      type: new GraphQLList(DistrictType),
      resolve: async () => {
        try {
          return await District.getAll();
        } catch (error) {
          console.error('GraphQL error in districts resolver:', error);
          throw error;
        }
      },
    },
    district: {
      type: DistrictType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => District.findById(args.id),
    },
    cities: {
      type: new GraphQLList(CityType),
      resolve: async () => City.getAll(),
    },
    city: {
      type: CityType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => City.findById(args.id),
    },
    neighborhoods: {
      type: new GraphQLList(NeighborhoodType),
      resolve: async () => Neighborhood.getAll(),
    },
    neighborhood: {
      type: NeighborhoodType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => Neighborhood.findById(args.id),
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
