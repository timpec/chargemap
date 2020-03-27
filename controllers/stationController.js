'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  try {
    const stations = await stationModel.find().populate('Connection');
    //res.send('With this endpoint you can get stations');
    res.json(stations);
  }
  catch(e) {
    console.error('station_list_get', e);
    res.status(500).json({message: e.message});
  }
};

const station_get = async (req, res) => {
  try {
    const stations = await stationModel.findById(req.params.id);
    //res.send('With this endpoint you can get one station');
    res.json(stations);
  }
  catch(e) {
    console.error('station_get', e);
    res.status(500).json({message: e.message});
  }
};

const station_post = async (req, res) => {
  res.send('With this endpoint you can add stations');
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
};
