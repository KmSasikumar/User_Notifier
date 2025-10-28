const Incident = require('../models/Incident');

// Get all statistics
exports.getStatistics = async (req, res) => {
  try {
    const incidents = await Incident.find();

    const totalAccidents = incidents.length;
    const helpsToday = incidents.filter(incident => {
        const today = new Date();
        const incidentDate = new Date(incident.timestamp);
        return incidentDate.getDate() === today.getDate() &&
               incidentDate.getMonth() === today.getMonth() &&
               incidentDate.getFullYear() === today.getFullYear();
    }).length;

    // Placeholder data for distance and badge
    const distanceToday = 10;
    const badge = 'Gold';

    res.status(200).json({
        totalAccidents,
        helpsToday,
        distanceToday,
        badge,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
