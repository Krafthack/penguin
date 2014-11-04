var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var auth = require('./api/auth');
var config = require('./api/config');

var logger = {
  error: console.error,
  info: console.log
}

mongoose.connect(config.mongoDbUrl);
var db = mongoose.connection;
db.on('error', function () {
    logger.error('Could not connect to mongo db');
});

db.once('open', function callback() {
    logger.info('Connected to mongo db');
});

var app = express();

app.set('port',  process.env.PORT || 8000);

app.use(bodyParser());
app.use(session({ secret: config.sessionSecret }));
app.use(auth({callback: 'http://localhost:' + app.get('port') + '/auth/twitter/callback'}));
app.use('/', express.static(__dirname + '/../public'));

app.listen(app.get('port'), () =>
  console.log('Running on port: ' + app.get('port')))
