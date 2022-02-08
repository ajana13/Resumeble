const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verification_url_code: {
    type: String,
    default: () => uuidv4(),
  },
  password_reset_url_code: {
    type: String,
    default: '',
  },
  profileID: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
