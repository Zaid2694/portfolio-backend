const express = require('express');
const router = express.Router();
const { submitMessage, getMessages } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/contact', submitMessage);
router.get('/messages', authMiddleware, roleMiddleware('admin'), getMessages);

module.exports = router;
