const
  mongoose = require('mongoose'),
  UsersData = mongoose.model('usersData');

module.exports = async (req, res, next) => {
  console.log("middleware:  req = ", req.user);
  console.log("middleware: ", {
    loginError: req.flash('loginError'),
    passwordError: req.flash('passwordError'),
    emailError: req.flash('emailError')});
  
  if (req.user) {
    let findUsersData = await UsersData.findOne({_user: req.user.id});
    if (findUsersData) {
      //console.log("findUsersData: ", findUsersData);
      let userData = {name: req.user.name, email: req.user.email, userData: findUsersData};
       return res.send(userData);
    }
    else{
      return res.send({userData: {}});
    }
  }
 console.log("middleware next()");
  next();
};
