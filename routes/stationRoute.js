'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const passport = require('../utils/pass.js');

router.get('/:limit?', stationController.station_list_get);

router.get('/:id', stationController.station_get);

router.post('/', passport.authenticate('jwt', {session: false}), stationController.station_post);

module.exports = router;
