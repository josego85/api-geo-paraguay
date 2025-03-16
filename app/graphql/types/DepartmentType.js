const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  fields: () => ({
    departamento_id: { type: GraphQLID },
    departamento_nombre: { type: GraphQLString },
    departamento_capital: { type: GraphQLString },
  }),
});

module.exports = DepartmentType;
