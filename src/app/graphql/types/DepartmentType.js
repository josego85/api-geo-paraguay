const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    capital_name: { type: GraphQLString },
  }),
});

module.exports = DepartmentType;
