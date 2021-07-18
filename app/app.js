"use strict";

import express from "express";
import createLocaleMiddleware from "express-locale";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swagger as swaggerDocument } from "./config/swagger.config.js";
import rest from "routes/index.js";
import startPolyglot from "middleware/startPolyglot.middleware.js";

const app = express();

app.use(express.json());

// Translation. English default language.
app.use(
  createLocaleMiddleware({
    priority: ["accept-language", "default"],
    default: "en-US",
  })
);

// Set the language in the req with the phrases to be used.
app.use(startPolyglot);

// Security.
app.use(helmet());
app.use(cors());

// Documentation.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Register the API REST routes.
app.use("/api/v1", rest);

module.exports = app;
