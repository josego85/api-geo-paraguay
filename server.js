'use strict';
const mongoose = require('mongoose');
const globalConfig = require('./app/config/global.config.js');
const app = require('./app/app.js');
const { APP_NAME, APP_PORT, MONGO_URI } = globalConfig;

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(`${MONGO_URI}/${APP_NAME}`);
}
async function startServer() {
    app.listen(APP_PORT, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        main().catch((err) => console.log(err));
        console.log(`The server listening on ${APP_PORT}`);
    });
}

// Start server.
startServer();
