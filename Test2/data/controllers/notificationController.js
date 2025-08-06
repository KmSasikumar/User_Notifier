const Notification = require('../models/Notification');

// Send a notification
exports.sendNotification = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};