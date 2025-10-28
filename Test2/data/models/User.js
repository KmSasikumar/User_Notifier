const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  age: { type: String },
  bloodGroup: { type: String },
  phoneNumber: { type: String },
  gender: { type: String },
  profession: { type: String },
  bio: { type: String },
  memberSince: { type: String },
  membershipStatus: { type: String },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);