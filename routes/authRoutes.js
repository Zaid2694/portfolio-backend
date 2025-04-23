const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getUser);

module.exports = router;
