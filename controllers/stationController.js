'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  try {
    const stations = await stationModel.find().populate('Connections');
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
    const station = await stationModel.findById(req.params.id).populate([
      {
        path: "Connections",
        model: "Connection",
        populate: [
          {
            path: "ConnectionTypeID",
            model: "ConnectionType"
          },
          {
            path: "CurrentTypeID",
            model: "CurrentType"
          },
          {
            path: "LevelID",
            model: "Level"
          }
        ]
      }
    ])
    //res.send('With this endpoint you can get one station');
    res.json(station);
  }
  catch(e) {
    console.error('station_get', e);
    res.status(500).json({message: e.message});
  }
};

const station_post = async (req, res) => {
  try {
    const station = await stationModel.create({
      Title: req.body.Title,
      AddressLine1: req.body.AdressLine1,
      Town: req.body.Town,
      StateOrProvince: req.body.StateOrProvince,
      Postcode: req.body.Postcode,
      Connections: "Should add list of cellections first", //TODO
      Location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true,}
      },
      coordinates: {
        type: [Number], // First is longitude, second latitude
        required: true,
      }
    });
    res.send('Added station: ', station.Title)
  }
  catch(e) {
    console.error('station_get', e);
    res.status(500).json({message: e.message});
  }
  //res.send('With this endpoint you can add stations');
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
};
