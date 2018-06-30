'use strict'
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var fs = require('fs');


// function prueba(req, res) {
//     res.status(200).send({
//         messsage: "Hola mundo con nodeJS y express"
//     });
// }

function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) {
            res.status(500).send({ messsage: 'Error al devolver el user' });
        } else {
            if (!user) {
                res.status(404).send({ messsage: 'El user no existe' });
            } else {
                res.status(200).send({
                    // user
                    registry_time: user.registry_time, _id: user._id, name: user.name, mail: user.mail, password: user.password, description: user.description, profile_photo: user.profile_photo
    
                });
            }
        }
    });
}

function searchUsers(req, res) {
    var name = req.params.user;
    var regularExpression = new RegExp(name);
    //buscar  las imagenes asociadas al user 
    console.log('name ' + name);
    // db.users.find({"name": {$regex: 'jaa'}}).pretty()
    if (!name) {
        //Sacar todas las imagenes de bbdd
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al devolver users' });
            } else {
                if (!users) {
                    res.status(404).send({ messsage: 'No hay users' });
                } else {
                    res.status(200).send({ users });
                }
            }
        });
    }
    else {
        User.find({ name: { $regex: regularExpression, $options: 'i' } }).sort('-name').exec((err, users) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al devolver users' });
            } else {
                if (!users) {
                    res.status(404).send({ messsage: 'No hay users' });
                } else {
                    res.status(200).send({ users });
                }
            }
        });
    }
}
    function getUsers(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al devolver users' });
            } else {
                if (!users) {
                    res.status(404).send({ messsage: 'No hay users' });
                } else {
                    res.status(200).send({ users });
                }
            }
        });
    }

    function saveUser(req, res) {
        var user = new User();

        var params = req.body;

        console.log(params);

        user.name = params.name;
        user.mail = params.mail;
        user.password = params.password;
        user.description = null;
        user.profile_photo = null;
        user.registry_date = Date.now

        if (params.password) {
            // encriptar contraseña
            bcrypt.hash(params.password, null, null, function (err, hash) {
                user.password = hash;

                if (user.name != null && user.mail != null) {
                    // guardar usuario
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ messsage: 'Error al guardar el user' });
                        } else {
                            if (!userStored) {
                                res.status(404).send({ messsage: 'No se ha guardado el user' });
                            } else {
                                res.status(200).send({
                                    registry_time: user.registry_time, _id: user._id, name: user.name, mail: user.mail, password: user.password, description: user.description, profile_photo: user.profile_photo
                                });
                            }
                        }
                    });
                } else {
                    res.status(200).send({ message: 'Rellena todos los campos' });
                }
            });
        } else {
            res.status(200).send({ message: 'Introduce la contraseña' });
        }
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) {
                res.status(500).send({ messsage: 'Error al actualizar el user' });
            } if (!userUpdated) {
                res.status(404).send({ messsage: 'No se ha actualizado el user' });
            } else {
                res.status(200).send({ 
                    //user: userUpdated 
                    _id: userId,
                    //  name: update.name, description: user.description, profile_photo: user.profile_photo
                });
            }
        });
    }

    function deleteUser(req, res) {
        var userId = req.params.id;

        User.findByIdAndRemove(userId, function (err, userRemoved) {
            if (err) {
                res.status(500).send({ messsage: 'Error al borrar el user' });
            } else {
                if (!userRemoved) {
                    res.status(404).send({ messsage: 'No hay user' });
                }
                else {
                    res.status(200).send({ message: userRemoved });
                }
            }
        });
    }

    function uploadImage(req, res) {
        var userId = req.params.id;
        var file_name = 'No subido...';

        if (req.files) {
            var file_path = req.files.image.path;
            var file_split = file_path.split('/');
            var file_name = file_split[1];

            console.log(file_path);
            console.log(file_name);

            User.findByIdAndUpdate(userId, { profile_photo: file_name }, (err, imageUpdated) => {
                if (err) {
                    res.status(500).send({ messsage: 'Error al actualizar la imagen de perfil' });
                } else {
                    if (!imageUpdated) {
                        res.status(404).send({ messsage: 'No se ha actualizado la imagen de perfil' });
                    } else {
                        res.status(200).send({ 
                            user: imageUpdated 
                        //file_name
                        
                        });
                    }
                }
            });
        } else {
            res.status(200).send({ messsage: 'No has subido una imagen' });
        }
    }


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

    function loginUser(req, res) {
        var params = req.body;
        var mail = params.mail;
        var password = params.password;

        User.findOne({ mail: mail.toLowerCase() }, (err, user) => {

            if (err) {
                res.status(500).send({ messsage: 'Error en la peticion' });
            } else {
                if (!user) {
                    res.status(404).send({ message: 'El usuario no existe' });
                } else {
                    //comprobar contraseña
                    bcrypt.compare(password, user.password, function (err, check) {
                        if (check) {
                            //devolver datos del usuario loggeado
                            if (params.gethash) {
                                //devolver token jwt
                            } else {
                                res.status(200).send({
                                    //user
                                    registry_time: user.registry_time, _id: user._id, name: user.name, mail: user.mail, password: user.password, description: user.description, profile_photo: user.profile_photo
                                });
                            }
                        } else {
                            res.status(404).send({ messsage: 'El usuario no ha podido loggearse' })
                        }
                    })
                }
            }
        })
    }

    module.exports = {
        getUser,
        getUsers,
        saveUser,
        updateUser,
        deleteUser,
        uploadImage,
        getImageFile,
        loginUser,
        searchUsers
    }