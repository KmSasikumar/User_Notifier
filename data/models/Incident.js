const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'resolved'], default: 'active' },
});

module.exports = mongoose.model('Incident', IncidentSchema);