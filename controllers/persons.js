const personsRouter = require("express").Router();
const Person = require("../models/person");
//const date = new Date();

// personsRouter.get("/", (request, response) => {
//   response.send("<h1>Hello Persons!</h1>");
// });

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((p) => {
      if (p) {
        response.json(p);
      } else {
        response.status(404).send({ error: "no id" });
      }
    })
    .catch((error) => next(error));
});

// personsRouter.get("/info", async (request, response) => {
//   const aa = await Person.countDocuments({});
//   response.send(
//     `<div><p>Phonebook has info for ${aa} people</p> <p>${date}</p></div>`
//   );
// });

personsRouter.post("/", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number required",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => next(err));
});

personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPrs) => {
      response.json(updatedPrs);
    })
    .catch((error) => next(error));
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
