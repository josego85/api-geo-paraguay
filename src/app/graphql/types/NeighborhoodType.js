const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const NeighborhoodType = new GraphQLObjectType({
  name: 'Neighborhood',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

module.exports = NeighborhoodType;
