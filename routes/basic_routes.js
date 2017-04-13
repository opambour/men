const express = require('express');
const basicRouter = express.Router();

// home page
basicRouter.get('/', function(req, res) {
    // it's a default: res.status(200);
    // it's a default: res.set('Content-type', 'text/html');
    res.render('index', { title: 'Home', path: req.path });
    console.log('URL: %s\nMethod: %s\nStatus: %s',
        req.url, req.method, res.statusCode);
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
    // session ID
    console.log('Session ID: ', req.sessionID);

    // next: Express is being told that the method was
    // processed and the regular processing can continue
    //return next();
});

// about page
basicRouter.get('/about', function(req, res) {
    // it's a default: res.status(200);
    // it's a default: res.set('Content-type', 'text/html');
    res.render('about', { title: 'About', path: req.path });
    console.log('URL: %s\nMethod: %s\nStatus: %s',
        req.url, req.method, res.statusCode);
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies);
    // session ID
    console.log('Session ID: ', req.sessionID);
});

// export basicRouter
module.exports = basicRouter;