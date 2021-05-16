const swagger = {
  openapi: "3.0.3",
  info: {
    title: "API GEO Paraguay",
    description: "API GEO Paraguay",
    version: "1.5.0",
    contact: {
      email: "josego85@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Development server,",
    },
  ],
  paths: {
    "/barrios": {
      get: {
        description: "All barrios",
        parameters: [
          {
            in: "header",
            name: "accept-language",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Return all the barrios",
          },
        },
      },
    },
  },
  components: {},
  tags: [],
};

export { swagger };
