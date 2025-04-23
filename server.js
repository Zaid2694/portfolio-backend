// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// Rate Limiting Middleware (to avoid spam)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use('/api/contact', limiter); // Apply only to contact form

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/contactRoutes'));

// Home Route (Optional)
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
