const { createYoga } = require('graphql-yoga');
const schema = require('./schema');

const graphqlRouter = createYoga({
  schema,
  graphiql: {
    title: 'API GEO Paraguay - GraphQL',
  },
  graphqlEndpoint: '/graphql',
});

module.exports = graphqlRouter;
