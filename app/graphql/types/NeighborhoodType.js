const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const NeighborhoodType = new GraphQLObjectType({
  name: 'Neighborhood',
  fields: () => ({
    barrio_id: { type: GraphQLID },
    barrio_nombre: { type: GraphQLString },
  }),
});

module.exports = NeighborhoodType;
