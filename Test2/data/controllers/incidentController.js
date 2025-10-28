const Incident = require('../models/Incident');

// Report a new incident
exports.reportIncident = async (req, res) => {
  const { type, location, description, priority } = req.body;
  try {
    const incident = new Incident({ type, location, description, priority });
    await incident.save();

    // Emit a real-time notification
    if (req.io) {
        req.io.emit('newIncident', incident);
    }

    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all incidents
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};