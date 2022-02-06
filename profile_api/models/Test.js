const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  userID:{
    type: String,
  },
  name: {
    type: String,
  },
location: {
  type: String,
},
about: {
  type: String,
},
profileID: {
    type: String
  }
});

module.exports = User = mongoose.model("tests", TestSchema);
