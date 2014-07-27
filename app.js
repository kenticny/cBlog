
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var flash = require("connect-flash");
var MongoStore = require("connect-mongo")(express);
var config = require("./config");
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(flash());
app.use(express.session({
	secret: config.session.cookieSecret,
	// key: config.session.db,
	cookie: {
		maxAge: null
	},
	store: new MongoStore({
		url: config.database.uri + "/" + config.session.collection
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
