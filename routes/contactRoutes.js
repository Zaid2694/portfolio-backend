const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // ✅ Only once

const router = express.Router();
const {
  submitContactForm,
  getAllMessages
} = require('../controllers/contactController');

// Contact form submit route (reCAPTCHA already verified)
router.post('/contact', submitContactForm);

// Protected route to get all messages
router.get('/messages', verifyToken, getAllMessages);

module.exports = router;
