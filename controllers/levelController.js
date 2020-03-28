'use strict';
const levelModel = require('../models/level');

const level_list_get = async (req, res) => {
  try {
    const level = await levelModel.find();
    //res.send('With this endpoint you can get level');
    res.json(level);
  }
  catch(e) {
    console.error('level_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const level_get = async (req, res) => {
  try {
    const level = await levelModel.findById(req.params.id);
    //res.send('With this endpoint you can get one level');
    res.json(level);
  }
  catch(e) {
    console.error('level_get', e);
    res.status(500).json({message: e.message});
  }
};

const level_post = async (req, res) => {
  res.send('With this endpoint you can add level');
};

module.exports = {
  level_list_get,
  level_get,
  level_post,
};
