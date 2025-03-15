const mongoose = require('mongoose');
const { redisClient } = require('./app/helpers/providers/cache/redisClient');
const mysqlConnection = require('./app/models/db');

beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017';

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for Jest tests!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
});

afterAll(async () => {
  if (redisClient) {
    await redisClient.disconnect();
  }

  if (mysqlConnection) {
    await mysqlConnection.end();
  }

  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }

  await new Promise((resolve) => {
    setTimeout(() => resolve(), 100);
  });
});
