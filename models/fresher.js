var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var fresherSchema = mongoose.Schema({
    rating       : Number,
    comment      : String,
    lecturer     : String,
    user         : String
});

fresherSchema.plugin(timestamps);
module.exports = mongoose.model('Fresher', fresherSchema);