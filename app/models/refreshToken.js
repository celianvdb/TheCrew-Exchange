const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RefreshToken = new Schema({
    user: { type : String },
    refresh_token : { type : String }
})

module.exports = mongoose.model('RefreshToken', RefreshToken);