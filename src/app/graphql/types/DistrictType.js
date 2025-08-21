const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const DistrictType = new GraphQLObjectType({
  name: 'District',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
});

module.exports = DistrictType;
