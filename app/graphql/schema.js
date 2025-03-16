const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const Department = require('models/department.model');
const District = require('models/district.model');
const City = require('models/city.model');
const DepartmentType = require('./types/DepartmentType');
const DistrictType = require('./types/DistrictType');
const CityType = require('./types/CityType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    departments: {
      type: new GraphQLList(DepartmentType),
      resolve: async () => Department.getAll(),
    },
    department: {
      type: DepartmentType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => Department.findById(args.id),
    },
    districts: {
      type: new GraphQLList(DistrictType),
      resolve: async () => District.getAll(),
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
