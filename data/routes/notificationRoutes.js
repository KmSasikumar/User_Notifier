const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();

// POST /notify - Send a notification
router.post('/notify', async (req, res, next) => {
    try {
        await sendNotification(req, res);
    } catch (error) {
        next(error);
    }
});

// Optional: Health check route to verify notification endpoints are working
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Notification routes are working' });
});

module.exports = router;
