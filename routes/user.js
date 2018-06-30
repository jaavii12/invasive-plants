'use strict'

var express = require('express');
var UserController = require('../controlers/user');
var api = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

api.get('/user/:id', UserController.getUser);
api.get('/users', UserController.getUsers);
api.post('/user', UserController.saveUser);
api.put('/user/:id', UserController.updateUser);
api.delete('/user/:id', UserController.deleteUser);
api.post('/upload-image-u/:id', multipartMiddleware, UserController.uploadImage);
api.get('/get-image-u/:imageFile', multipartMiddleware, UserController.getImageFile);
api.post('/login', UserController.loginUser);
api.get('/searchUsers/:user?', UserController.searchUsers)

module.exports = api;