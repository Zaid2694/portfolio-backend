const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all required fields.' });
  }

  try {
    const msg = await Message.create({ name, email, subject, message });
    await sendEmail(name, email, subject, message);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error("Email/DB error:", error.message);
    res.status(500).json({ error: 'Message failed to send.', details: error.message });
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
