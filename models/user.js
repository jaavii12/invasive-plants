'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: { type: String, required: true, trim: true }, //user_name
    mail: { type: String, required: true, trim: true, unique: true }, // user_name
    description: { type: String }, //presentacion del usuatio (presentation)
    password: { type: String, required: true }, 
    profile_photo: String,
    registry_time: { type: String }
});

module.exports = mongoose.model('User', UserSchema);


