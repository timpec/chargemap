'use strict';
const currentTypeModel = require('../models/currentType');

const currentType_list_get = async (req, res) => {
  try {
    const currentType = await currentTypeModel.find().populate('Connections');
    //res.send('With this endpoint you can get currentType');
    res.json(currentType);
  }
  catch(e) {
    console.error('currentType_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const currentType_get = async (req, res) => {
  try {
    const currentType = await currentTypeModel.findById(req.params.id);
    //res.send('With this endpoint you can get one currentType');
    res.json(currentType);
  }
  catch(e) {
    console.error('currentType_get', e);
    res.status(500).json({message: e.message});
  }
};

const currentType_post = async (req, res) => {
  res.send('With this endpoint you can add currentType');
};

module.exports = {
  currentType_list_get,
  currentType_get,
  currentType_post,
};
