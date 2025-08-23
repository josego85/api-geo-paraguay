const mongoose = require('mongoose');

const schema = mongoose.Schema({
  url: String,
  method: String,
  ip: String,
  geo: Object,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', schema);
