var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var AccessToken = new mongoose.Schema({
    token: {
      type: String,
      required: true
    },
    secret: {
      type: String,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

AccessToken.plugin(findOrCreate);

module.exports = mongoose.model('AccessToken', AccessToken);
