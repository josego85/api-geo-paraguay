import { APP_PORT, URL_DOMAIN } from "./global.config.js";

const versionSystem = process.env.npm_package_version;

const swagger = {
  openapi: "3.0.3",
  info: {
    version: versionSystem,
    title: "API GEO Paraguay",
    description: "API GEO Paraguay",
    contact: {
      email: "josego85@gmail.com",
    },
  },
  externalDocs: [
    {
      url: `${URL_DOMAIN}:${APP_PORT}/api-docs`,
    },
  ],
  servers: [
    {
      url: `${URL_DOMAIN}:${APP_PORT}/api/v1`,
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
