'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3700;


mongoose.connect('mongodb://localhost:27017/invasory_plantsv1', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Conexion a MongoDB');
        app.listen(port, function () {
            console.log('Estoy funcionando en el http://localhost:' + port);
        });
    }
});



