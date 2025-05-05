const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();

// ✅ CORS configuration for local + Render frontend
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://portfolio-frontend-abc123.onrender.com' // 🔁 replace with your actual frontend Render URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connect
connectDB();

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('Portfolio Backend Running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
