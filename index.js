var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./api/auth');

var app = express();

app.set('port',  process.env.PORT || 8000);

app.use(bodyParser());
app.use(session({ secret: 'i am legend' }));
app.use(auth({callback: 'http://localhost:' + app.get('port') + '/auth/twitter/callback'}));

app.use('/', express.static(__dirname + '/../public'));

app.listen(app.get('port'), () =>
  console.log('Running on port: ' + app.get('port')))
