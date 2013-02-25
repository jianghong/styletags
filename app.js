
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , image = require('./routes/image')
  , mongoose = require('mongoose')
  , Tag = require('./models/Tag')
  , Img = require('./models/Img');

mongoose.connect('mongodb://localhost/tags');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', image.index);
app.get('/users', user.list);
app.get('/search/:tag', image.show);
app.post('/upload', image.upload);
app.get('/load/:next', image.load);
app.get('/load/:tag/:next', image.load_by_tag);
app.get('/tags', Tag.getTags);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
