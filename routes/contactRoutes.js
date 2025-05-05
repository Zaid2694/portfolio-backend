const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const verifyToken = require('../middleware/verifyToken');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const axios = require('axios');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: 'Too many messages sent, please try again later.',
});

router.post('/', limiter, async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: 'All fields and token are required' });
  }

  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
    const response = await axios.post(verifyURL);

    if (!response.data.success) {
      return res.status(400).json({ message: 'Failed reCAPTCHA verification' });
    }

    const newMessage = await Message.create({ name, email, subject, message });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Message from ${name}`,
      html: `<p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Message failed to send', error: err.message });
  }
});

router.get('/messages', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
});

module.exports = router;
