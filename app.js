const express = require('express');
const app = express();
const logger= require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/main');
const router = require('./router');
const socketEvents = require('./socketEvents');

//Running the Server
const server = app.listen(config.port);
console.log('Server is running on port: ' + config.port);

//socket connection to Server
const io = require('socket.io').listen(server);
socketEvents(io);

//Log requests with morgan
app.use(logger('dev'));

//CORS for Client-Side
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//More middleware to parse JSON from POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup connection to mongodb
mongoose.connect(config.db);
mongoose.Promise = global.Promise;
console.log('Mongoose Connected!');

//setup routes
router(app);
