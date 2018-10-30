const
  mongoose = require('mongoose'),
  {Schema} = mongoose,
  userSchema = new Schema({
    googleId: String,
    name: String
  });

mongoose.model('users', userSchema);
