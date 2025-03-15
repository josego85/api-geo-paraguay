const { URL_DOMAIN } = require('./global.config');
const { version: versionSystem } = require('../../package.json');

const nodeEnv = process.env.NODE_ENV || 'development';
const servers = [
  {
    url: `${URL_DOMAIN}/api/v1`,
    description: nodeEnv === 'production' ? 'Production server' : 'Development server',
  },
];

const swagger = {
  openapi: '3.0.3',
  info: {
    version: versionSystem,
    title: 'API GEO Paraguay',
    description:
      'A RESTful service that provides detailed geographical information for Paraguay based on coordinates (longitude and latitude).',
    contact: {
      email: 'josego85@gmail.com',
    },
  },
  externalDocs: [
    {
      url: `${URL_DOMAIN}/api-docs`,
      description: 'Find more info here',
    },
  ],
  tags: [
    {
      name: 'Department',
      description: 'Department related endpoints',
    },
    {
      name: 'District',
      description: 'District related endpoints',
    },
    {
      name: 'City',
      description: 'City related endpoints',
    },
    {
      name: 'Neighborhood',
      description: 'Neighborhood related endpoints',
    },
  ],
  servers,
  paths: {
    '/paraguay/{longitude}/{latitude}': {
      get: {
        summary: 'Get all geographical data for a coordinate',
        description:
          'Retrieves detailed information including department, district, city, and neighborhood for the given longitude and latitude.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'longitude',
            description: 'Longitude coordinate',
            required: true,
            schema: {
              type: 'number',
            },
          },
          {
            in: 'path',
            name: 'latitude',
            description: 'Latitude coordinate',
            required: true,
            schema: {
              type: 'number',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successfully retrieved geographical data',
          },
          400: {
            description: 'Invalid parameters supplied',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/departamentos': {
      get: {
        tags: ['Department'],
        summary: 'List all departments',
        description: 'Retrieves a list of all departments in Paraguay.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful retrieval of departments',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Departments',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/departamentos/{id}': {
      get: {
        tags: ['Department'],
        summary: 'Get a department by ID',
        description: 'Retrieves details for a specific department identified by its ID.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
          {
            in: 'path',
            name: 'id',
            description: 'Department ID',
            required: true,
            schema: {
              type: 'number',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful retrieval of department details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Department',
                },
              },
            },
          },
          404: {
            description: 'Department not found',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/distritos': {
      get: {
        tags: ['District'],
        summary: 'List all districts',
        description: 'Retrieves a list of all districts in Paraguay.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful retrieval of districts',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Districts',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/ciudades': {
      get: {
        tags: ['City'],
        summary: 'List all cities',
        description: 'Retrieves a list of all cities in Paraguay.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful retrieval of cities',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Cities',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/barrios': {
      get: {
        tags: ['Neighborhood'],
        summary: 'List all neighborhoods',
        description: 'Retrieves a list of all neighborhoods in Paraguay.',
        parameters: [
          {
            in: 'header',
            name: 'accept-language',
            description: 'Language code (e.g. en, es)',
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'Successful retrieval of neighborhoods',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Neighborhoods',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Department: {
        type: 'object',
        properties: {
          departamento_id: {
            type: 'integer',
            description: '',
          },
          departamento_capital: {
            type: 'string',
            description: 'Capital city of the department',
          },
        },
      },
      Departments: {
        type: 'array',
        description: 'List of all departments',
        items: {
          $ref: '#/components/schemas/Department',
        },
      },
      District: {
        type: 'object',
        properties: {
          distrito_id: {
            type: 'integer',
            description: 'Unique identifier for the district',
          },
          distrito_nombre: {
            type: 'string',
            description: 'Name of the district',
          },
        },
      },
      Districts: {
        type: 'array',
        description: 'List of all districts',
        items: {
          $ref: '#/components/schemas/District',
        },
      },
      City: {
        type: 'object',
        properties: {
          ciudad_id: {
            type: 'integer',
            description: 'Unique identifier for the city',
          },
          ciudad_nombre: {
            type: 'string',
            description: '',
          },
        },
      },
      Cities: {
        type: 'array',
        description: 'List of all cities',
        items: {
          $ref: '#/components/schemas/City',
        },
      },
      Neighborhood: {
        type: 'object',
        properties: {
          barrio_id: {
            type: 'integer',
            description: 'Unique identifier for the neighborhood',
          },
          barrio_nombre: {
            type: 'string',
            description: 'Name of the neighborhood',
          },
        },
      },
      Neighborhoods: {
        type: 'array',
        description: 'List of all neighborhoods',
        items: {
          $ref: '#/components/schemas/Neighborhood',
        },
      },
    },
  },
};

module.exports = swagger;
