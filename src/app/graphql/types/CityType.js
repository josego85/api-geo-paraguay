const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

module.exports = CityType;
