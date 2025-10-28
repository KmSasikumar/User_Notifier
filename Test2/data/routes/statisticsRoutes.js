const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');

const router = express.Router();

// GET /statistics - Retrieve statistics
router.get('/statistics', async (req, res, next) => {
    try {
        await getStatistics(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
