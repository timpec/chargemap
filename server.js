'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const stationRoute = require('./routes/stationRoute');
const connectionRoute = require('./routes/connectionRoute');
const currentTypeRoute = require('./routes/currentTypeRoute');
const connectionTypeRoute = require('./routes/connectionTypeRoute');
const levelRoute = require('./routes/levelRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute.js'); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

app.use('/station', stationRoute);
app.use('/connection', connectionRoute);
app.use('/currentType', currentTypeRoute);
app.use('/connectionType', connectionTypeRoute);
app.use('/level', levelRoute);
app.use('/user', userRoute);

db.on('connected', () => {
  app.listen(3000);
});
