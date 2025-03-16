const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const DistrictType = new GraphQLObjectType({
  name: 'District',
  fields: () => ({
    distrito_id: { type: GraphQLID },
    distrito_nombre: { type: GraphQLString },
  }),
});

module.exports = DistrictType;
