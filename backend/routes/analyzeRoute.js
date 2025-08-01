// server/routes/analyzeRoute.js
const express = require('express');
const router = express.Router();
const { analyzeWithGemini } = require('../controllers/analyzeController');

router.post('/', analyzeWithGemini);

module.exports = router;
