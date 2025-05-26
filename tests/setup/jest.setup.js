require('dotenv').config();

// Mock TypeORM DataSource for tests to prevent actual DB connections
jest.mock('typeorm', () => {
  const originalTypeORM = jest.requireActual('typeorm');
  return {
    ...originalTypeORM,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn().mockResolvedValue(undefined),
      // Add mocks for other DataSource methods if they are called during app setup/teardown
      // For example, if your app uses `manager` or `getRepository` on the DataSource instance directly:
      // manager: { getRepository: jest.fn() }, 
      // getRepository: jest.fn(),
    })),
  };
});

// Mock Mongoose connect for tests
jest.mock('mongoose', () => {
  const originalMongoose = jest.requireActual('mongoose');
  return {
    ...originalMongoose,
    connect: jest.fn().mockResolvedValue(undefined),
    set: jest.fn(), // Mock 'set' as it's called in server.js: mongoose.set('strictQuery', false);
    // Add mocks for other Mongoose methods if they are called
  };
});

// Mock ioredis for tests
jest.mock('ioredis', () => {
  return jest.fn().mockImplementation(() => ({
    status: 'ready', // Mock status to prevent connection hangs
    connect: jest.fn().mockResolvedValue(undefined),
    on: jest.fn(), // Mock event listeners
    disconnect: jest.fn().mockResolvedValue(undefined),
    // Add mocks for other ioredis methods if they are called
  }));
});

// Mock Log model to prevent DB operations during tests
// Corrected path for Jest module resolution (app is like src)
jest.mock('app/models/log.model.js', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(undefined),
  }));
});

// Increase timeout for integration tests
jest.setTimeout(30000);

// Add custom matchers
expect.extend({
  toBeSorted(received, compareFn) {
    const sortedArray = [...received].sort(compareFn);
    const pass = JSON.stringify(received) === JSON.stringify(sortedArray);
    return {
      pass,
      message: () => `Expected array to be sorted according to the compare function`,
    };
  },
});

// Clean up resources after all tests
afterAll(async () => {
  // Add any global cleanup here if needed
  await new Promise((resolve) => setTimeout(resolve, 500)); // Drain event loop
});
