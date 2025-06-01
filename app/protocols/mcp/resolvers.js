const { GraphQLScalarType, Kind } = require('graphql');
const CityService = require('services/cityService');

// Define available endpoints
const AVAILABLE_ENDPOINTS = {
  getCities: {
    name: 'getCities',
    description: 'Get list of cities with pagination',
    parameters: {
      page: 'number (optional)',
      limit: 'number (optional)',
    },
    returns: 'Array of cities',
    examples: [
      'Get first 10 cities',
      'List cities in Alto Paraná',
      'Find cities starting with "San"',
    ],
    metadata: {
      cursorCompatible: true,
      langbaseEnabled: true,
      queryPatterns: ['list cities', 'show cities', 'find cities'],
    },
    handler: async (params) => CityService.findAll(params),
  },
  // Add more endpoints here
};

const resolvers = {
  Query: {
    mcpQuery: async (_, { message }) => {
      try {
        if (!message || !message.body) {
          throw new Error('Invalid message format');
        }

        const { type = 'cities', page = 1, limit = 10 } = message.body;

        if (typeof type !== 'string') {
          throw new Error('Type must be a string');
        }

        const serviceResponse = await CityService.findAll({
          page: parseInt(page, 10),
          limit: parseInt(limit, 10),
        });

        return {
          status: 'success',
          data: serviceResponse.data,
          metadata: {
            ...serviceResponse.metadata,
            queryInfo: {
              type,
              timestamp: new Date().toISOString(),
            },
          },
        };
      } catch (error) {
        console.error('MCP Query Error:', error);
        return {
          status: 'error',
          data: [],
          metadata: {
            error: error.message,
          },
          timestamp: new Date().toISOString(),
        };
      }
    },
  },
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON custom scalar type',
    serialize(value) {
      return value;
    },
    parseValue(value) {
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.OBJECT) {
        const value = Object.create(null);
        ast.fields.forEach((field) => {
          value[field.name.value] = this.parseLiteral(field.value);
        });
        return value;
      }
      if (ast.kind === Kind.INT) return parseInt(ast.value, 10);
      if (ast.kind === Kind.FLOAT) return parseFloat(ast.value);
      if (ast.kind === Kind.STRING) return ast.value;
      if (ast.kind === Kind.BOOLEAN) return ast.value;
      return null;
    },
  }),
};

module.exports = resolvers;
