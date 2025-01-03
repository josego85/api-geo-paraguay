const mongoose = require('mongoose');
const globalConfig = require('./app/config/global.config');
const app = require('./app/app');

const { APP_NAME, APP_PORT, MONGO_URI } = globalConfig;

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(`${MONGO_URI}/${APP_NAME}`);
}
async function startServer() {
  app.listen(APP_PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
    main().catch((error) => console.log(error));
    console.log(`Server running on port ${APP_PORT}`);
  });
}

// Start server.
startServer();
