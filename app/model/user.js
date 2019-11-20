'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true
    }
  });
  return mongoose.model('User', UserSchema, 'users');
};