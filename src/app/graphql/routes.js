const { createYoga } = require('graphql-yoga');
const schema = require('./schema');

const graphqlRouter = createYoga({
  schema,
  graphiql: true,
  graphqlEndpoint: '/graphql',
});

module.exports = graphqlRouter;
