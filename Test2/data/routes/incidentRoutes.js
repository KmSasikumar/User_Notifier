const express = require('express');
const { reportIncident, getIncidents } = require('../controllers/incidentController');

const router = express.Router();

// POST /report-incident - Report a new incident
router.post('/report-incident', async (req, res, next) => {
    try {
        await reportIncident(req, res);
    } catch (error) {
        next(error);
    }
});

// GET /incidents - Retrieve all incidents
router.get('/incidents', async (req, res, next) => {
    try {
        await getIncidents(req, res);
    } catch (error) {
        next(error);
    }
});

// Optional: Health check route for incident endpoints
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Incident routes are working' });
});

module.exports = router;
