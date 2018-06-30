'use strict'

var Image = require('../models/image');

function prueba(req, res) {
    res.status(200).send({
        messsage: "Hola mundo con nodeJS y express"
    });
}

function getFavorito(req, res) {
    var favoritoId = req.params.id;

    Favorito.findById(favoritoId, function (err, favorito) {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver el marcador' });
        } else {
            if (!favorito) {
                res.status(404).send({ messsage: 'No hay marcador' });
            } else {
                res.status(200).send({ favorito });
            }
        }
    });
}

function getFavoritos(req, res) {
    Favorito.find({}, (err, favoritos) => {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver marcadores' });
        } else {
            if (!favoritos) {
                res.status(404).send({ messsage: 'No hay marcadores' });
            } else {
                res.status(200).send({ favoritos });
            }
        }
    });
}

function saveFavorito(req, res) {
    var favorito = new Favorito();

    var params = req.body;

    favorito.title = params.title;
    favorito.description = params.description;
    favorito.url = params.url;

    favorito.save((err, favoritoStored) => {
        if (err) {
            res.status(500).send({ messsage: 'Error al guardar el marcador' });
        } else {
            res.status(200).send({ favorito });
        }
    });
}

function updateFavorito(req, res) {
    var favoritoId = req.params.id;
    var update = req.body;

    Favorito.findByIdAndUpdate(favoritoId, update, (err, favoritoUpdated) => {
        if (err) {
            res.status(500).send({ messsage: 'Error al actualizar el marcador' });
        } else {
            res.status(200).send({ favorito: favoritoUpdated });
        }
    });
}

function deleteFavorito(req, res) {
    var favoritoId = req.params.id;

    Favorito.findById(favoritoId, function (err, favorito) {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver el marcador' });
        }
        if (!favorito) {
            res.status(404).send({ messsage: 'No hay marcador' });
        }
        else {
            favorito.remove(err => {
                if (err) {
                    res.status(500).send({ messsage: 'Error al borrar' });
                }
                else {
                    res.status(200).send({ message: 'El marcador se ha eliminado' });
                }
            });
        }
    });
}



module.exports = {
    prueba,
    getFavorito,
    getFavoritos,
    saveFavorito,
    updateFavorito,
    deleteFavorito
}