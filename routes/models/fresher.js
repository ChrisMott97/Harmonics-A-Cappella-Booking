var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var fresherSchema = mongoose.Schema({
    firstName     : String,
    lastName      : String,
    email         : String,
    day          : String,
    time          : Number
});

fresherSchema.plugin(timestamps);
module.exports = mongoose.model('Fresher', fresherSchema);