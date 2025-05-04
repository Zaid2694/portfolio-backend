const axios = require('axios');
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.submitMessage = async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ error: 'Please fill all required fields and verify reCAPTCHA.' });
  }

  // Verify reCAPTCHA token with Google
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`);

    if (!response.data.success) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed. Please try again.' });
    }

    // Save message to DB and send email
    const msg = await Message.create({ name, email, subject, message });
    await sendEmail(name, email, subject, message);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error in reCAPTCHA/message:', error.message);
    res.status(500).json({ error: 'Failed to send message.', details: error.message });
  }
};
