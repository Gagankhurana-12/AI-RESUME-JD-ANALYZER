// server/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoute = require('./routes/analyzeRoute');

dotenv.config();

const app = express();

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://jdresumeanalyzer.netlify.app', 'http://localhost:5173', 'http://localhost:5174']
    : true,
  credentials: true
}));

app.use(express.json());

app.use('/api/analyze', analyzeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
