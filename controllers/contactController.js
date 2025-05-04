const Message = require('../models/Message');

// Save contact form message
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all messages (dashboard/admin)
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = {
  submitContactForm,
  getAllMessages,
};
