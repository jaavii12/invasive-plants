
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicationSchema = Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    picture: String,
    registry_time: { type: Date },
    lat: Number,
    lon: Number,
    user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Publication', PublicationSchema);