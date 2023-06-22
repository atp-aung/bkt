const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Person = require("../models/person");

const initialPersons = [
  {
    name: "vb",
    number: 66 - 123456,
  },
  {
    name: "cv",
    number: 676 - 123456,
  },
];

beforeEach(async () => {
  await Person.deleteMany({});
  let prsObject = new Person(initialPersons[0]);
  await prsObject.save();
  prsObject = new Person(initialPersons[1]);
  await prsObject.save();
});

test("all persons are returned", async () => {
  const response = await api.get("/api/persons");
  expect(response.body).toHaveLength(initialPersons.length);
});

test("there are two persons", async () => {
  const response = await api.get("/api/persons");
  expect(response.body).toHaveLength(2);
});

test("a specific person is within the returned persons", async () => {
  const response = await api.get("/api/persons");

  const names = response.body.map((r) => r.name);
  expect(names).toContain("ccc");
});

afterAll(async () => {
  await mongoose.connection.close();
});
