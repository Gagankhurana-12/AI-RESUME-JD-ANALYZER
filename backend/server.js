const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const analyzeRoute = require('./routes/analyzeRoute');

dotenv.config();

const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  'https://jdresumeanalyzer.netlify.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

// ✅ CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Middleware to parse large payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ API routes
app.use('/api/analyze', analyzeRoute);

// ✅ Error handling middleware for file uploads
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 10MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: 'Unexpected file field.' });
    }
  }

  if (error.message === 'Invalid file type. Only PDF and DOCX files are allowed.') {
    return res.status(400).json({ error: error.message });
  }

  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
