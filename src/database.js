var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/recipeatlocal'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // checks if env var is there, which means it is running remotely
    var username = process.env.MLAB_USERNAME;
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds151018.mlab.com:51018/heroku_m3rqq9s0';
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);
mongoose.Promise = q.Promise;

module.exports = mongoose;