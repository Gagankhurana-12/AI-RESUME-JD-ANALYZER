// server/routes/analyzeRoute.js
const express = require('express');
const router = express.Router();
const { analyzeWithGemini, extractText, uploadMiddleware } = require('../controllers/analyzeController');

// Route for text extraction from uploaded files
router.post('/extract-text', uploadMiddleware, extractText);

// Route for AI analysis
router.post('/', analyzeWithGemini);

module.exports = router;
