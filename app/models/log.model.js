const mongoose = require('mongoose');

const schema = mongoose.Schema({
    url: String,
    method: String,
    ip: String,
    geo: Object,
});

module.exports = mongoose.model('Log', schema);
