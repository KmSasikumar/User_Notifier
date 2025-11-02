const Incident = require('../models/Incident');

// Report a new incident
exports.reportIncident = async (req, res) => {
  const { type, location } = req.body;
  try {
    const incident = new Incident({ type, location });
    await incident.save();
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

exports.reportIncident = async (req, res) => {
  const { type, location } = req.body;
  try {
    const incident = new Incident({ type, location });
    await incident.save();

    // Emit a real-time notification
    req.io.emit('newIncident', incident);

    res.status(201).json(incident);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};