const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  village: { type: String, required: true },
  contactInfo: { type: String, required: true },
  story: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Artisan', artisanSchema);
