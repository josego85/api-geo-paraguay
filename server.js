'use strict'

const globalConfig = require('./app/config/global.config.js')
const app = require('./app/app.js')
const APP_PORT = globalConfig.APP_PORT

async function startServer() {
    app.listen(APP_PORT, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`The server listening on ${APP_PORT}`)
    })
}

// Start server.
startServer()
