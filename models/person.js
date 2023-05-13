const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },

  number: {
    type: String,
    minLength: 8,
    required: true,
    //match: /^(\d{2,3})-(\d+)$/,
    validate: {
      validator: function (v) {
        // Check if value is a string consisting of two text parts separated by a hyphen
        return /^(\d{2,3})-(\d+)$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid field value. It should have two number parts separated by a hyphen (-), and the first part should have two or three numbers.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
