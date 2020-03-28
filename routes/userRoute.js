'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../utils/pass.js');

router.get('/', passport.authenticate('jwt', {session: false}), userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', userController.user_post);

module.exports = router;
