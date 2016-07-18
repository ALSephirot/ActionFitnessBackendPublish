﻿
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var mongoose = require('mongoose');
var compress = require('compression');

var app = express();

//Connect to mongoDB
mongoose.connect('mongodb://actionfitness:admin16.@ds023495.mlab.com:23495/actionfitness', function (err, res) {
    //mongoose.connect('mongodb://localhost/GuiaDB', function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
        console.log(res);
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
//app.use(app.router);
app.use(multer());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(compress());

var MPasos = require('./models/Pasos')(app, mongoose);
var PasosCtrl = require('./Controllers/CPasos');

//Config header router
var router = express.Router();
router.get('/api', function (req, res) {
    res.send("<h1>Api Rest ActionFitness With MongoDB running...</h1>");
});

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(router);

// API routes
var pasosr = express.Router();

//---------Inicio rutas Users--------------//
pasosr.route('/pasos')
    .get(PasosCtrl.findAllPasos)
    .post(PasosCtrl.addUser);

pasosr.route('/pasos/:id')
    .get(PasosCtrl.findPasoById)
    .put(PasosCtrl.updateUser)
    .delete(PasosCtrl.deleteUser);

pasosr.route('/pasosIdentificacion/:Identificacion')
    .get(PasosCtrl.findUserByIdentificacion);

//----------Fin rutas Users-------------------//

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

//Config Api
app.use('/api', pasosr);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
