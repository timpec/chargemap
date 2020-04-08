'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const user = await userController.getUserLogin(params);
        //console.log('Local strategy', user); // result is binary row
        const userObject = user
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect name.'});
        }
        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        delete userObject.password
        return done(null, {...userObject}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        console.log(err)
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    (jwtPayload, done) => {

      //console.log(jwtPayload)
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return authController.jwt_auth_action(jwtPayload)//._doc)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));

module.exports = passport;