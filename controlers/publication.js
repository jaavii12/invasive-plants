'use strict'

var path = require('path');
var Publication = require('../models/publication');
var User = require('../models/user');

function prueba(req, res) {
    res.status(200).send({
        messsage: "Hola mundo con nodeJS y express"
    });
}

function getPublication(req, res) {
    var publicationId = req.params.id;
    
    Publication.findById(publicationId, function (err, publication) {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver la publicacion' });
        } else {
            if (!publicationId) {
                res.status(404).send({ messsage: 'La publicacion no existe' });
            } else {
                Publication.populate(publication, { path: 'user' }, (err, publication) => {
                    if (err) {
                        res.status(500).send({ messsage: 'Error en la peticion' });
                    } else {
                        res.status(200).send({ publication });
                    }
                });
            }
        }
    });
}

function getPublications(req, res) {
    var userId = req.params.user;

    if (!userId) {
        //Sacar todas las imagenes de bbdd
        Publication.find({}).sort('-registry_time').exec((err, publications) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al devolver publications' });
            } else {
                if (!publications) {
                    res.status(404).send({ messsage: 'No hay users' });
                } else {
                    Publication.populate(publications, { path: 'user' }, (err, publications) => {
                        if (err) {
                            res.status(500).send({ messsage: 'Error en la peticion' });
                        } else {
                            res.status(200).send({ publications });
                        }
                    });
                }
            }
        });
    } else {
        //sacar todas las imagenes asociadas al user
        Publication.find({ user: userId }).sort('-registry_time').exec((err, publications) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al devolver publications' });
            } else {
                if (!publications) {
                    res.status(404).send({ messsage: 'No hay users' });
                } else {
                    Publication.populate(publications, { path: 'user' }, (err, publications) => {
                        if (err) {
                            res.status(500).send({ messsage: 'Error en la peticion' });
                        } else {
                            res.status(200).send({ publications });
                        }
                    });
                }
            }
        });
    }
}

function getPublicationsByDate(req, res) {

    //sacar todas las imagenes asociadas al user
    Publication.find({ user: userId }).sort('-title').exec((err, publications) => {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver publications' });
        } else {
            if (!publications) {
                res.status(404).send({ messsage: 'No hay users' });
            } else {
                Publication.populate(publications, { path: 'user' }, (err, publications) => {
                    if (err) {
                        res.status(500).send({ messsage: 'Error en la peticion' });
                    } else {
                        res.status(200).send({ publications });
                    }
                });
            }
        }
    });
}


function savePublication(req, res) {
    var publication = new Publication();

    var params = req.body;
    console.log('json ' + req.body.lat);

    publication.title = params.title;
    publication.description = params.description;
    publication.picture = null;
    publication.lat = params.lat;
    publication.lon = params.lon;
    publication.user = params.user;
    publication.registry_time = new Date().toISOString();
    

    publication.save((err, publicationStored) => {
        console.log('e:  ' + err);

        if (err) {
            res.status(500).send({ messsage: 'Error al guardar la publication' });
        } else {
            if (!publicationStored) {
                res.status(404).send({ messsage: 'No se ha guardado la publication' });
            } else {

                res.status(200).send({
                    //publication: publicationStored
                    registry_time: publication.registry_time,
                    _id: publication._id,
                    title: publication.title,
                    description: publication.description,
                    picture: publication.picture,
                    location: publication.location,
                    user: publication.user,
                    lat: publication.lat,
                    lon:publication.lon
                });
            }
        }
    });
}


function updatePublication(req, res) {
    var publicationId = req.params.id;
    var update = req.body;

    Publication.findByIdAndUpdate(publicationId, update, (err, publicationUpdated) => {
        if (err) {
            res.status(500).send({ messsage: 'Error al actualizar la publication' });
        } else {
            if (!publicationUpdated) {
                res.status(404).send({ messsage: 'No se ha actualizado la publication' });
            } else {
                res.status(200).send({ publication: publicationUpdated });
            }
        }
    });
}

function deletePublication(req, res) {
    var publicationId = req.params.id;

    Publication.findByIdAndRemove(publicationId, function (err, publicationRemoved) {
        if (err) {
            res.status(500).send({ messsage: 'Error al borrarla publication' });
        } else {
            if (!publicationRemoved) {
                res.status(404).send({ messsage: 'No hay publication' });
            }
            else {
                res.status(200).send({ message: publicationRemoved });
            }
        }
    });
}

function uploadImage(req, res) {
    var publicationId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('/');
        var file_name = file_split[1];

        console.log(file_path);
        console.log(file_name);

        Publication.findByIdAndUpdate(publicationId, { picture: file_name }, (err, publicationUpdated) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al actualizar la publication' });
            } else {
                if (!publicationUpdated) {
                    res.status(404).send({ messsage: 'No se ha actualizado la publication' });
                } else {
                    res.status(200).send({ publication: publicationUpdated });
                }
            }
        });
    } else {
        res.status(200).send({ messsage: 'No has subido una imagen' });
    }
}

// function uploadImage(req, res) {
//     var publicationId = req.params.id;
//     var file_name = 'No subido...';

//     if (req.files) {
//         var file_path = req.files.image.path;
//         var file_split = file_path.split('\\');
//         var file_name = file_split[2];

//         // var ext_split = file_name.split('\.');
//         // var file_ext = ext_split[1];
//         //file_ext == 'gif')

//         if (file_ext == 'png' || file_ext == 'jpg')  {

//             Publication.findByIdAndUpdate(publicationId, { picture: file_name }, (err, publicationUpdated) => {
//                 if (!publicationUpdated) {
//                     res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
//                 } else {
//                     res.status(200).send({ 
//                         //publication: publicationUpdated 
//                         _id: publication._id,
//                         title: publication.title,
//                         user: publication.user
//                     });
//                 }
//             });
//         } else {
//             res.status(200).send({ message: 'Extensión del archivo no valida' });
//         }

//     } else {
//         res.status(200).send({ message: 'No has subido ninguna imagen...' });
//     }
// }

var fs = require('fs');

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;
    fs.exists('./uploads/' + imageFile, function (exists) {
        if (exists) {
            res.sendFile(path.resolve('./uploads/' + imageFile));
        } else {
            res.status(200).send({ message: 'No existe la imagen!! ' });
        }
    });
}


module.exports = {
    prueba,
    getPublication,
    getPublications,
    savePublication,
    updatePublication,
    deletePublication,
    uploadImage,
    getImageFile
}