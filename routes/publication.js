'use strict'

var express = require('express');
var PublicationController = require('../controlers/publication');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/prueba', PublicationController.prueba);
api.get('/publication/:id', PublicationController.getPublication);
api.get('/publications/:user?', PublicationController.getPublications);
api.post('/publication', PublicationController.savePublication);
api.put('/publication/:id', PublicationController.updatePublication);
api.delete('/publication/:id', PublicationController.deletePublication);
api.post('/upload-image-p/:id', multipartMiddleware, PublicationController.uploadImage);
api.get('/get-image-p/:imageFile', multipartMiddleware, PublicationController.getImageFile);

module.exports = api;