"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const rest = require("./routes/index.js");
const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Register the routes.
app.use("/api/v1", rest);

module.exports = app;

// Funcion para obtener la IP.
// function getIP(req) {
//     var ip = req.headers['x-forwarded-for'] ||
//       req.connection.remoteAddress ||
//       req.socket.remoteAddress ||
//       req.connection.socket.remoteAddress;
//     ip = ip.split(',')[0];
//     ip = ip.split(':').slice(-1); // En caso que la IP retorne en el formato: "::ffff:146.xxx.xxx.xxx"
//     return ip;
// }

/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
// v1.use(function(req, res, next) {
//     var ip = getIP(req);
//     console.log("Cliente IP es: " + ip);
//     console.log(req.method, req.url);
//     next();
// });
