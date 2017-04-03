const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// routes files
const basicRouter = require('./routes/basic_routes');


// create main express module
const app = express();

// =============== set middleware ===================
app.set('port', process.env.PORT || 3000); // set port number
app.set('trust proxy', 1); // trust first proxy
app.set('views', path.join(__dirname, 'views')); // set views
app.set('view engine', 'pug'); // set template engine

// use favicon
// app.use(favicon(path.join(__dirname, 'public', 'img/MEN_logo.png')));

// serving static files: HTML files, images, fonts, css and so on
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cookieParser('TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX'));

// configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization');
    next();
});

// logger, errorhandler during development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// log all requests to the console
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
}

// -------------------- Routers ----------------------
app.use('/', basicRouter); // basic router middleware

// custom 500 page
app.use(function(err, req, res) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    return res.send('500 - Server Error: Something broke!');
});

// custom 404 page
app.use(function(req, res) {
    res.status(404);
    return res.render('404', { urlAttempted: req.url });
});

// ------------------Server Connection ---------------------------
const port = app.get('port'); // listen to port

let server = app.listen(port, 'localhost', function(err) {
    if (err) {
        throw err;
    } else {
        const host = server.address().address;
        console.log('App Server Listening on http://%s:%s', host, port);
        console.log('\npress Ctrl-C to terminate.');
    }
});

// export APP
module.exports = server;