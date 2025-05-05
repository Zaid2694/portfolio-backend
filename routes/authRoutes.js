const express = require('express');
const router = express.Router();
const { signup, login, getUser } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);

module.exports = router;
