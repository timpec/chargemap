'use strict';
// stationRoute
const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');
const passport = require('../utils/pass.js');

router.get('/', stationController.station_list_get);

router.get('/:id', stationController.station_get);

router.post('/', passport.authenticate('jwt', {session: false}), stationController.station_post);

router.put('/', passport.authenticate('jwt', {session: false}), stationController.station_modify);

router.delete('/:id', stationController.station_delete);

module.exports = router;
