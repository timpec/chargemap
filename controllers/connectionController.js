'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
    const connections = await connectionModel.find()
      .populate('ConnectionTypeID')
      .populate('LevelID')
      .populate('CurrentTypeID');
    //res.send('With this endpoint you can get connections');
    res.json(connections);
  }
  catch(e) {
    console.error('connection_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const connection_get = async (req, res) => {
  try {
    const connections = await connectionModel.findById(req.params.id)
    .populate('ConnectionTypeID')
    .populate('LevelID')
    .populate('CurrentTypeID');
    //res.send('With this endpoint you can get one connection');
    res.json(connections);
  }
  catch(e) {
    console.error('connection_get', e);
    res.status(500).json({message: e.message});
  }
};

const connection_post = async (req, res) => {
  res.send('With this endpoint you can add connections');
};


module.exports = {
  connection_list_get,
  connection_get,
  connection_post,
};
