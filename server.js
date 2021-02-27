"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const key = fs.readFileSync(__dirname + '/certificates/key.pem');
const cert = fs.readFileSync(__dirname + '/certificates/cert.pem');
const rest = require('./app/routes/index.js');
const globalConfig = require('./app/config/global.config.js');

const app = express();
const https = require('https');

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded(
{ 
    extended: true
}));

// Register the routes.
app.use('/api/v1', rest);

// Start Server.
const server = https.createServer(
{
    key: key,
    cert: cert
}, app);

server.listen(globalConfig.APP_PORT, () =>
{
    console.log('listening on ' + globalConfig.APP_PORT);
});


// let server = app.listen(3000, function ()
// {
//     let host = server.address().address;
//     let port = server.address().port;

//     host = (host === '::' ? 'localhost' : host);
//     console.log("Server: ", server.address());
//     console.log('Escucha http://%s:%s', host, port);
// });

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
