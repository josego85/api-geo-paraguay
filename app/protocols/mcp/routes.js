const { createYoga, createSchema } = require('graphql-yoga');
const mcpTypeDefs = require('./schema');
const mcpResolvers = require('./resolvers');

const mcpSchema = createSchema({
  typeDefs: [mcpTypeDefs],
  resolvers: mcpResolvers,
});

const mcpYoga = createYoga({
  schema: mcpSchema,
  graphiql: false,
  context: async ({ req }) => ({
    startTime: Date.now(),
    protocol: 'mcp',
  }),
  formatError: (error) => ({
    message: error.message || 'MCP Error occurred',
    code: error.extensions?.code || 'MCP_ERROR',
    timestamp: new Date().toISOString(),
  }),
});

module.exports = mcpYoga;
