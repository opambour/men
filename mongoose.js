const mongoose = require('mongoose');
let config = {};

// connect db
config.dbURI = 'mongodb://localhost:27017/meandb';

// checking mongoose status connection
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to: ' + config.dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected: ');
});

// Reusable function to close Mongoose connection
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

// Closing mongoose when the Node process ends
// process.on('SIGINT', function() {
//     mongoose.connection.close(function () {
//         console.log('Mongoose disconnected through app termination');
//         process.exit(0);
//     });
// });

module.exports = config;