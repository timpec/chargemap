'use strict';
const connectionTypeModel = require('../models/connectionType');

const connectionType_list_get = async (req, res) => {
  try {
    const connectionType = await connectionTypeModel.find().populate('Connections');
    //res.send('With this endpoint you can get connectionType');
    res.json(connectionType);
  }
  catch(e) {
    console.error('connectionType_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const connectionType_get = async (req, res) => {
  try {
    const connectionType = await connectionTypeModel.findById(req.params.id);
    //res.send('With this endpoint you can get one connectionType');
    res.json(connectionType);
  }
  catch(e) {
    console.error('connectionType_get', e);
    res.status(500).json({message: e.message});
  }
};

const connectionType_post = async (req, res) => {
  res.send('With this endpoint you can add connectionType');
};

module.exports = {
  connectionType_list_get,
  connectionType_get,
  connectionType_post,
};
