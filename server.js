const mongoose = require('mongoose');
const globalConfig = require('./app/config/global.config');
const app = require('./app/app');

const { APP_NAME, APP_PORT, MONGO_URI } = globalConfig;

async function connectDB() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(`${MONGO_URI}/${APP_NAME}`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    if (process.env.NODE_ENV !== 'test') process.exit(1);
  }
}

async function startServer() {
  await connectDB();

  app.listen(APP_PORT, (err) => {
    if (err) {
      console.error('Error starting server:', err);
      if (process.env.NODE_ENV !== 'test') {
        process.exit(1);
      }
    } else {
      console.log(`Server running on port ${APP_PORT}`);
    }
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;
