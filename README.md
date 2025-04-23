# 🌐 Portfolio Backend API

This is the backend for my portfolio website. It handles user authentication, contact form submissions, and provides an admin panel to manage messages securely.

---

## 🚀 Features

- Contact form with message storage and email notification
- User authentication (Signup/Login)
- Admin dashboard support for viewing/deleting messages
- Role-based access control (`admin`, `user`)
- Rate limiting to prevent spam
- JWT-based authentication
- MongoDB with Mongoose for data storage

---

## 📦 Tech Stack

- Node.js + Express.js
- MongoDB Atlas (via Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt.js for password hashing
- Nodemailer for email sending
- Express-rate-limit for spam prevention
- CORS support for frontend communication

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio-backend.git
cd portfolio-backend
