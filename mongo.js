const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

//mongodb+srv://atp:<password>@aaa.wxza5ra.mongodb.net/?retryWrites=true&w=majority
const url = `mongodb+srv://atp:${password}@aaa.wxza5ra.mongodb.net/pers?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "gg",
  number: 55,
});

person.save().then((result) => {
  console.log(result);
  console.log("person saved!");
  mongoose.connection.close();
});
