"use strict";

const { URL_DOMAIN } = require("./global.config.js");
const versionSystem            = process.env.npm_package_version;
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
      url: `${URL_DOMAIN}/api-docs`,
    },
  ],
  servers: [
    {
      url: `${URL_DOMAIN}/api/v1`,
      description: "Development server",
    },
  ],
  paths: {
    "/barrios": {
      get: {
        summary: "All neighborhood",
        description: "All neighborhood",
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
            description: "Return all the neighborhood",
          },
        },
      },
    },
    "/departamentos": {
      get: {
        summary: "All departaments",
        description: "All departaments",
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
            description: "Return all the departements",
          },
        },
      },
    },
    "/distritos": {
      get: {
        summary: "All distrits",
        description: "All distrits",
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
            description: "Return all the distrits",
          },
        },
      },
    },
    "/ciudades": {
      get: {
        summary: "All cities",
        description: "All cities",
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
            description: "Return all the cities",
          },
        },
      },
    },
    "/paraguay/{longitude}/{latitude}": {
      get: {
        summary: "All information from Paraguay (department, distrit, city and neighborhood",
        description: "All information from Paraguay (department, distrit, city and neighborhood",
        parameters: [
          {
            in: "header",
            name: "accept-language",
            schema: {
              type: "string",
            },
          },
          {
            in: "path",
            name: "longitude",
            description: "The longitude",
            required: true,
            schema: {
              type: "number",
            },
          },
          {
            in: "path",
            name: "latitude",
            description: "The latitude",
            required: true,
            schema: {
              type: "number",
            },
          },
        ],
        responses: {
          200: {
            description: "All information from Paraguay (department, distrit, city and neighborhoods",
          },
        },
      },
    },
  },
  components: {},
  tags: [],
};

module.exports = swagger;
