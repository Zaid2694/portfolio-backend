const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');
// controllers/contactController.js
import axios from 'axios';

export const submitContactForm = async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'reCAPTCHA token missing' });
  }

  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    if (!response.data.success) {
      return res.status(403).json({ error: 'Failed reCAPTCHA verification' });
    }

    // Save or send email logic here
    // e.g., save to DB or send to admin email

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
