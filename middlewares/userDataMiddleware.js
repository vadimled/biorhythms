const
  mongoose = require('mongoose'),
  UsersData = mongoose.model('usersData');

module.exports = async (req, res, next) => {
  console.log("middleware:  req = ", req.user);
  if (req.user) {
    let findUsersData = await UsersData.findOne({_user: req.user.id});
    if (findUsersData) {
      let userData = {name: req.user.name, email: req.user.email, userData: findUsersData};
       return res.send(userData);
    }
    else{
      return res.send({userData: {}});
    }
  }
  next();
};
