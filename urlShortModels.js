var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;


var urlShortSchema = new Schema({
    original_url: String,
    short_url: String,
    datetime: {
        type: Date,
        default: Date.now()
    }
})


var urlShort = mongoose.model('urlshort', urlShortSchema);

module.exports = urlShort;