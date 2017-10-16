'use strict';

const express = require('express');

const dashify = require('./utils/dashify');
const redirectToHTTPS = require('./utils/redirectToHTTPS');

const webapp = require('./routes/webapp');
const api = require('./routes/api');

const app = express();

// Templating engine
app.set('views', './views');
app.set('view engine', 'pug');
app.locals.dashify = dashify;

// Redirect HTTP traffic to HTTPS
app.use(redirectToHTTPS({ ignore: ['localhost:8080'] }));

// Static files
app.use(express.static(__dirname + '/public'));

// Webapp
app.use('/', webapp);

// API
app.use('/api', api);

// Start on port 1337
let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Listening on port ' + port + ' ...');
});
