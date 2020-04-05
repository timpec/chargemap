'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');

const login = (req, res) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log(user)
    console.log(info)
    const userLogged = user._doc
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }
   req.login(user, {session: false}, (err) => {
       if (err) {
           res.send(err);
       }
       // generate a signed son web token with the contents of user object and return it in the response
       const token = jwt.sign(user._doc, 'your_jwt_secret');
       return res.json({userLogged, token});
    });
  })(req, res);
};

const jwt_auth_action = async (params) => {
  try {
    console.log("Account used: ", params.username)
    return ("JWT-Authenticated Action Complete.")
    //const user = await userModel.findById(params)
    //return user;
  }
  catch (e) {
    console.error('error jwt', e.message)
  }
};

module.exports = {
  login,
  jwt_auth_action
};