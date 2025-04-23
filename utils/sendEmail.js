const nodemailer = require('nodemailer');
// temporary
console.log("Sending email to:", process.env.RECEIVER_EMAIL);
console.log("Using user:", process.env.EMAIL_USER);


module.exports = async (name, email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: subject || 'New Portfolio Message',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Failed to send email:", err.message);
    throw err;
  }
};

