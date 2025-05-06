require('dotenv').config();

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
