const
  mongoose = require('mongoose'),
  UsersData = mongoose.model('usersData');

module.exports = async (req, res, next) => {
  if (req.user) {
    let findUsersData = await UsersData.findOne({_user: req.user.id});
    if (findUsersData) {
      let userData = {name: req.user.name, email: req.user.email, userData: findUsersData};
      console.log(userData);
      return res.send(userData);
    }
  }
  next();
};
