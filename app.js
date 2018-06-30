'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
 
//carga rutas
var user_routes = require('./routes/user');
var publication_routes = require('./routes/publication');
// TODO: crear la ruta de amistad

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
    next();
});

//rutas base
app.use('/api', user_routes);
app.use('/api', publication_routes);
// TODO: crear la ruta de amistad

module.exports = app;