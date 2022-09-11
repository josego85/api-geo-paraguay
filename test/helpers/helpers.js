import { app } from "../../app/app";

const supertest = require("supertest");

class Helper {
  constructor(model) {
    this.apiServer = supertest(app);
  }
}

export { Helper };