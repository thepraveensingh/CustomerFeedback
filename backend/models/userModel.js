const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name : String,
  email : String,
  image : String
})
const UserModel = mongoose.model('social-logins',UserSchema);
module.exports = UserModel;