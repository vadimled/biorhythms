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
    const {name, email, photo} = req.user;
    let findUsersData = await UsersData.findOne({_user: req.user.id});
    if (findUsersData) {
      let userData = {
        name,
        email,
        image: photo,
        userData: findUsersData
      };
       return res.send(userData);
    }
    else{
      return res.send({userData: {}});
    }
  }
 console.log("middleware next()");
  next();
};
