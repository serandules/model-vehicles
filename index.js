var mongoose = require('mongoose');

module.exports = mongoose.model('Vehicle') || require('./model');