'use strict';
const connecionModel = require('../models/connecion');

const connecion_list_get = async (req, res) => {
  try {
    const connecions = await connecionModel.find();
    res.send('With this endpoint you can get connecions');
    res.send(connecions);
  }
  catch(e) {
    console.error('connecion_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const connecion_get = async (req, res) => {
  try {
    const connecions = await connecionModel.findById(req.params.id);
    res.send('With this endpoint you can get one connecion');
    res.send(connecions);
  }
  catch(e) {
    console.error('connecion_get', e);
    res.status(500).json({message: e.message});
  }
};

const connecion_post = (req, res) => {
  res.send('With this endpoint you can add connecions');
};

module.exports = {
  connecion_list_get,
  connecion_get,
  connecion_post,
};
