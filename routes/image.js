'use strict'

var express = require('express');
var FavoritoController = require('../controlers/favorito');
var api = express.Router();

api.get('/prueba', FavoritoController.prueba);

api.get('/favorito/:id', FavoritoController.getFavorito);
api.get('/favoritos', FavoritoController.getFavoritos);
api.post('/favorito', FavoritoController.saveFavorito);
api.put('/favorito/:id', FavoritoController.updateFavorito);
api.delete('/favorito/:id', FavoritoController.deleteFavorito);

module.exports = api;