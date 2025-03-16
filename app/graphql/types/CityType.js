const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const CityType = new GraphQLObjectType({
  name: 'City',
  fields: () => ({
    ciudad_id: { type: GraphQLID },
    ciudad_nombre: { type: GraphQLString },
  }),
});

module.exports = CityType;
