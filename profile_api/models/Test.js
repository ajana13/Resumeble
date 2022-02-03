const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  profileID: {
    type: String
  }
});

module.exports = User = mongoose.model("tests", TestSchema);
