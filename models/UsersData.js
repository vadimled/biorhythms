const
  mongoose = require('mongoose'),
  {Schema} = mongoose,
  usersDataSchema = new Schema({
    // Store an id (ObjectId) of a "User" model
    _user: {type: Schema.Types.ObjectId, ref: "User"},
    birthday: String,
    birthTime: {type: String, default: "08:00"},
    weight: {type: Number, default: 3.5},
    gender: String
  });

mongoose.model('usersData', usersDataSchema);
