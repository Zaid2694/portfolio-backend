const Message = require("../models/Message");
const axios = require("axios");

exports.sendMessage = async (req, res) => {
  const { name, email, subject, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: "reCAPTCHA token missing" });
  }

  try {
    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;

    const response = await axios.post(verifyURL, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    const data = response.data;

    if (!data.success || data.score < 0.5) {
      return res.status(400).json({ success: false, message: "Failed reCAPTCHA verification" });
    }

    // Save message
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(200).json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
