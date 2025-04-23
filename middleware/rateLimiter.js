const rateLimit = require('express-rate-limit');

// Custom Rate Limiter for Contact Form
const contactFormLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 requests per minute
  message: {
    error: 'Too many messages sent from this IP. Please try again after a minute.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = contactFormLimiter;
