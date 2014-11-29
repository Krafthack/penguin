var mongoose = require('mongoose');
var AccessToken = require('./access-token');

var User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

User.virtual('userId')
    .get(function () {
        return this.id;
    });

module.exports = mongoose.model('User', User);
