const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql');
const City = require('models/city.model');
const CityType = require('./types/CityType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
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
