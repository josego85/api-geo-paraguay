"use strict";

const express = require("express");
const createLocaleMiddleware = require("express-locale");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const rest = require("./routes/index.js");
const startPolyglot = require("./middleware/startPolyglot.middleware.js");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

// Register the API REST routes.
app.use("/api/v1", rest);

module.exports = app;
