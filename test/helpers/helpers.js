const supertest = require('supertest');
const app = require('../../app/app');

class Helper {
  constructor(model) {
    this.apiServer = supertest(app);
  }
}

export { Helper };
