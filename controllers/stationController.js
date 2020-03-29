'use strict';
const stationModel = require('../models/station');

const station_list_get = async (req, res) => {
  if (req.query.topLeft != undefined && req.query.topRight != undefined && req.query.bottomRight != undefined) {
    console.log(req.query)
    res.json(await station_get_polygon(req.query));
  } else {
  var limit = parseInt(req.params.limit, 10)
  if (limit === undefined) {
    limit = 10;
  }
  console.log(limit)
  try {
    const stations = await stationModel
    .find()
    .limit(limit)
    .populate('Connections');
    //res.send('With this endpoint you can get stations');
    res.json(stations);
  }
  catch(e) {
    console.error('station_list_get', e);
    res.status(500).json({message: e.message});
  }
}
};

const station_get_polygon = async (params) => {
  console.log("Poly", params);

  const topLeft = JSON.parse(params.topLeft);
  const topRight = JSON.parse(params.topRight);
  const bottomRight = JSON.parse(params.bottomRight);
  //const bottomLeft = JSON.parse(polyObj.bottomLeft);
  console.log(topLeft.lng, topLeft.lat)
  console.log(topRight.lng, topRight.lat)
  console.log(bottomRight.lng, bottomRight.lat)

  const polygon = {
    type: 'Polygon',
    coordinates: [[
      [topLeft.lng, topLeft.lat],
      [topRight. lng, topRight.lat],
      [bottomRight.lng, bottomRight.lat],
      [topLeft.lng, topLeft.lat]
    ]]
  }
  try {
    return await stationModel.find({}).where('Location').within(polygon).populate([
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
  }
  catch (e) {
    return e;
  }
}

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

    console.log(req.body)
    const listOfConnections = []
    req.body.Connections.forEach(item => {
        listOfConnections.push(item);
    })

    const station = await stationModel.create({
      Title: req.body.Title,
      AddressLine1: req.body.AdressLine1,
      Town: req.body.Town,
      StateOrProvince: req.body.StateOrProvince,
      Postcode: req.body.Postcode,
      Connections: listOfConnections,
      Location: {
        type: "Point",
        coordinates: [req.body.Location[0], req.body.Location[1]]
      }
    });
    const newID = await stationModel.find({Title: req.body.Title})
    res.json({message: 'Added station', newID})
  }
  catch(e) {
    console.error('station_get', e);
    res.status(500).json({message: e.message});
  }
};

const station_modify = async (req, res) => {
  try {
    console.log(req.body)
    const station = await stationModel.findByIdAndUpdate({_id: req.body.id}, {Title: req.body.Title});
    res.send('Modified stations "' + station.Title + '" title')
  }
  catch(e) {
    console.error('station_get', e);
    res.status(500).json({message: e.message});
  }
};

const station_delete = async (req, res) => {
  try {
  const station = (await stationModel.findByIdAndDelete(req.params.id).populate([
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
  ]))
  res.json({message: "Deleted station", station});
}
catch (e) {
  res.json({message: e.message})
}}

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_modify,
  station_delete
};
