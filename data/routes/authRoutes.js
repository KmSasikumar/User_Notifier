const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST /register - Handle user registration
router.post('/register', async (req, res, next) => {
    try {
        await register(req, res);
    } catch (error) {
        next(error);
    }
});

// POST /login - Handle user login
router.post('/login', async (req, res, next) => {
    try {
        await login(req, res);
    } catch (error) {
        next(error);
    }
});

// Optional: Health check route to verify auth routes are working
router.get('/health', (req, res) => {
    res.status(200).json({ message: 'Auth routes are working' });
});

module.exports = router;
