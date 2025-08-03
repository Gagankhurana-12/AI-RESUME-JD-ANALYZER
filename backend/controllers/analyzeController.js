const axios = require('axios');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'), false);
    }
  }
});

exports.uploadMiddleware = upload.single('file');

exports.extractText = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    if (req.file.mimetype === 'application/pdf') {
      // Extract text from PDF
      const pdfData = await pdfParse(req.file.buffer);
      extractedText = pdfData.text;
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Extract text from DOCX
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      extractedText = result.value;
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ error: 'No text could be extracted from the file' });
    }

    res.json({ 
      text: extractedText,
      filename: req.file.originalname,
      fileSize: req.file.size
    });

  } catch (error) {
    console.error('Error extracting text:', error);
    res.status(500).json({ error: 'Error extracting text from file' });
  }
};

exports.analyzeWithGemini = async (req, res) => {
  const { resume, jd } = req.body;

  const prompt = `
You're a smart AI resume analyzer.

Compare the following resume and job description.

Return:
1. Match percentage (0–100)
2. List of strong/covered skills
3. List of missing skills
4. Suggestions for improving the resume

--- Job Description ---
${jd}

--- Resume ---
${resume}
`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ result });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Gemini API error' });
  }
};
