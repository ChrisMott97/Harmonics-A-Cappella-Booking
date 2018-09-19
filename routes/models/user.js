var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var userSchema = mongoose.Schema({
    username      : String,
    password      : String
});

userSchema.plugin(timestamps);
module.exports = mongoose.model('User', userSchema);