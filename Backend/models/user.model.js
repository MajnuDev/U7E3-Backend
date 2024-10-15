const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String }  // Made optional by removing `required: true`
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = { UserModel };
