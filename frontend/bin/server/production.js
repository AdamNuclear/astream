/**
 * Created by Krtkoff on 7.12.2015.
 */

var express     = require('express'),
    compression = require('compression'),
    bodyParser  = require('body-parser'),
    url         = require("url");
    path        = require("path");

var app = express();

app.use(compression());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var staticMiddle = express.static(__dirname + '/../client');
app.use(function(req,res,next){
    var path = url.parse(req.url).pathname;
    if (!path || path === '/') {
        return next();
    }
    staticMiddle(req,res,next);
});


app.use(function(req,res,next){
    var pathname = url.parse(req.url).pathname;

    if( pathname!=='/') return next();
    res.sendfile(path.resolve(__dirname + '/../client/index.html'));
});

app.listen('8686');