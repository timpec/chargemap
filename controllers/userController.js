'use strict';
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 12;


const user_list_get = async (req, res) => {
  try {
    const user = await userModel.find();
    //res.send('With this endpoint you can get user');
    console.log(user)
    res.json(user);
  }
  catch(e) {
    console.error('user_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const user_get = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    //res.send('With this endpoint you can get one user');
    delete user.password
    res.json(user);
  }
  catch(e) {
    console.error('user_get', e);
    res.status(500).json({message: e.message});
  }
};

const user_post = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltRound);
    const myUser = await userModel.create({
      username:  req.body.username,
      //Email: //req.body.Email,
      password: hash //req.body.password
    });
      res.send(`Added user: ${myUser.username}`);
    }
  catch(e) {
      console.error('user_post', e);
      res.status(500).json({message: e.message});
    }
};

const getUserLogin = async (params) => {
    try {
      //console.log("B", params);
      const [user] = await userModel.find({username: params})
      //console.log("T", user)
      return user;
    } 
    catch (e) {
      console.log('error', e.message);
    }
  };

  /*
  const getUser = async (params) => {
    try {
      //console.log("Account used: ", params)
      //res.send("JWT-Authenticated Action Complete.")
      const user = await userModel.findById(params)
      return user;
    }
    catch (e) {
      console.error('error jwt', e.message)
    }
  };
  */

module.exports = {
  user_list_get,
  user_get,
  user_post,
  getUserLogin,
  //getUser
};
