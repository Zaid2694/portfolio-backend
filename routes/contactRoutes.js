import express from 'express';
import { submitContactForm, getMessages } from '../controllers/contactController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// POST: /api/contact — Submit contact form with reCAPTCHA
router.post('/', submitContactForm);

// GET: /api/contact/messages — Admin/dashboard message fetch (protected)
router.get('/messages', verifyToken, getMessages);

export default router;
