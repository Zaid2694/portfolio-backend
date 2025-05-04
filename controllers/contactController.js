const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

const axios = require("axios");

exports.submitMessage = async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "reCAPTCHA token missing" });
  }

  // Verify token with Google
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  try {
    const verifyRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );

    if (!verifyRes.data.success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "reCAPTCHA verification error" });
  }

  // Baqi ka existing code (save + email)
};


exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
