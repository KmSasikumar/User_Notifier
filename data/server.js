const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

// API Key Authentication Middleware
const apiAuth = (req, res, next) => {
  // Debug log: verify that the API key is correctly loaded from the .env file
  console.log("API Key from env:", process.env.API_KEY);
  const apiKey = req.header('x-api-key'); // Get API key from request headers
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "can't be processed" });
  }
  next();
};

// Routes
app.use('/api/auth', apiAuth, authRoutes);
app.use('/api/incidents', apiAuth, incidentRoutes);
app.use('/api/notifications', apiAuth, notificationRoutes);

// Basic route to test server
app.get('/', (req, res) => {
  res.send('UserNotifier Backend is Running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
