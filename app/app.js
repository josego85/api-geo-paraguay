"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const rest = require("./routes/index.js");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Security.
app.use(helmet());
app.use(cors());

// Register the API REST routes.
app.use("/api/v1", rest);

module.exports = app;
