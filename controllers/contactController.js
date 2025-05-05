import Message from '../models/Message.js';
import axios from 'axios';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message, token } = req.body;

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await axios.post(verifyURL);
    const { success } = response.data;

    if (!success) return res.status(400).json({ message: 'reCAPTCHA verification failed' });

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Message sending failed', error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get messages', error: err.message });
  }
};
