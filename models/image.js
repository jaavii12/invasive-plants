'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = Schema({
    title: String,
    description: String,
    publication: {type: Schema.ObjectId, ref: 'Publication'}
});

module.exports = mongoose.model('Favorito', ImageSchema);