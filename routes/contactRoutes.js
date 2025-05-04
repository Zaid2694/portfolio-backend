const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllMessages
} = require('../controllers/contactController');
const verifyToken = require('../middleware/verifyToken');

// Contact form submit route (with reCAPTCHA already handled on frontend)
router.post('/contact', submitContactForm);

// Protected route to get all messages (for dashboard/admin)
router.get('/messages', verifyToken, getAllMessages);

module.exports = router;
