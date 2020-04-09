'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
//const cors = require('cors');
const db = require('./database/db');
//const stationRoute = require('./routes/stationRoute');
//const connectionRoute = require('./routes/connectionRoute');
//const currentTypeRoute = require('./routes/currentTypeRoute');
//const connectionTypeRoute = require('./routes/connectionTypeRoute');
//const levelRoute = require('./routes/levelRoute');
const userRoute = require('./routes/userRoute');
const passport = require('./utils/pass.js');
const authRoute = require('./routes/authRoute.js'); 
const app = express();
const helmet = require('helmet');

app.use(helmet());

//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  console.log("Production");
  require('./production')(app, process.env.PORT);
} else {
  console.log("Development");
  require('./localhost')(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}

const checkAuth = (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user) =>{
      if (err || !user) {
          throw new Error('Not authenticated');
      }
  })(req, res)
};

app.use('/auth', authRoute);

app.use(
  '/graphql', (req, res) => {
    graphqlHTTP({
      schema: MyGraphQLSchema,
      graphiql: true,
      context: {req, res, checkAuth},
    })(req, res);
  });

/*
app.use('/station', stationRoute);
app.use('/connection', connectionRoute);
app.use('/currentType', currentTypeRoute);
app.use('/connectionType', connectionTypeRoute);
app.use('/level', levelRoute);
*/
app.use('/user', userRoute);

db.on('connected', () => {
  console.log("Listening")
});