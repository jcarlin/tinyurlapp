const mongoose = require('mongoose');

const tinyUrlSchema = new mongoose.Schema({
  url: { type: String, index: { unique: true }},
  tinyUrl: String,
  clicks: Number
});

module.exports = mongoose.model('TinyUrl', tinyUrlSchema);