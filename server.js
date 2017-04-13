const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const mongoose = require('mongoose');

// store session in mongodb database
const MongoDbStoreSession = require('connect-mongo')(session);

// routes files
const basicRouter = require('./routes/basic_routes');
const signupRouter = require('./routes/signup_routes');
const profileRouter = require('./routes/profile_routes');
const loginRouter = require('./routes/login_routes');
const usersRouter = require('./routes/users_routes');
const adminRouter = require('./routes/admin_routes');

// models
const Category = require('./models/product/category.model');
const User = require('./models/user.model');


// libraray: config files
const mongooseConfig = require('./lib/mongoose.config');

// mongoose promise
mongoose.Promise = global.Promise;

// Connect to mongodb: dbURI
mongoose.connect(mongooseConfig.dbURI);


// create main express module
const app = express();

// for mongo session store
let store = new MongoDbStoreSession({
    url: mongooseConfig.dbURI,
    touchAfter: 24 * 3600,
    autoReconnect: true,
});

// =============== set middleware ===================
app.set('port', process.env.PORT || 3000); // set port number
app.set('trust proxy', 1); // trust first proxy
app.set('views', path.join(__dirname, 'views')); // set views
app.set('view engine', 'pug'); // set template engine

app.use(helmet());

// use favicon
// app.use(favicon(path.join(__dirname, 'public', 'img/MEN_logo.png')));


// serving static files: HTML files, images, fonts, css and so on
app.use(express.static(path.join(__dirname, './public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cookieParser('TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX'));
// app.use(session({ cookie: { maxAge: 60000 } }));

app.use(session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    name: 'sessionId',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }, // 60000 milliseconds = 1 minute, 300000 is 5 minutes
    store: store,
    // unset: 'destroy', // default is 'keep'. 'destroy' will delete session when the response ends. 
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// set app local variables:
app.use(function(req, res, next) {
    // req.user
    res.locals.user = req.user;
    next();
});

// middleware to set local variable
app.use(function(req, res, next) {
    // local variable for User model
    User.find({}).exec(function(err, allUsers) {
        if (err) {
            return next(err);
        }

        // count documents in category
        res.locals.allUsers = allUsers;
        next();
    });
});

// middleware to set local variable
app.use(function(req, res, next) {
    // category local variable
    Category.find().exec(function(err, categories) {
        if (err) {
            return next(err);
        }

        // count documents in category
        res.locals.categories = categories;
        next();
    });

    // set app local variables: req.user is from passport
    res.locals.user = req.user;
});

// Middleware: configure our app to handle CORS requests
app.use(function(req, res, next) {
    // Set cache control header to eliminate cookies from cache
    res.header('Cache-Control', 'no-cache="Set-Cookie, Set-Cookie2"');

    // cors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers',
        'X-Requested-With, content-type, Authorization');
    next();
});

// for production
const productionSession = {
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    cookie: {},
};

// logger, errorhandler during development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// log all requests to the console
if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compression());
    app.set('trust proxy', 1); // trust first proxy
    productionSession.cookie.secure = true; // serve secure cookies
}

// -------------------- Routers ----------------------
// logout
app.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy(); // delete session
    return res.redirect(301, '/login');
});

app.use('/', basicRouter); // basic router middleware
app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);

// custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404', { urlAttempted: req.url });
});

// custom 500 page
app.use(function(err, req, res, next) {
    res.status(500);
    res.send('500 - Server Error: Something broke!');
    console.error(err.stack);
    return next(err);
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