const mongoose = require('mongoose');
const { redisClient } = require('./app/helpers/providers/cache/redisClient');
const mysqlConnection = require('./app/models/db');
const app = require('./server');

let server;

beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017';
  const TEST_APP_NAME = process.env.TEST_APP_NAME || 'test-api-geo-paraguay';

  try {
    await mongoose.connect(`${MONGO_URI}/${TEST_APP_NAME}`);
    console.log('MongoDB connected for Jest tests!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }

  server = app.listen();
});

afterAll(async () => {
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
  }

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  if (mysqlConnection) {
    await mysqlConnection.end();
  }

  if (server) {
    server.close();
  }

  await new Promise((resolve) => {
    setTimeout(() => resolve(), 100);
  });
});
