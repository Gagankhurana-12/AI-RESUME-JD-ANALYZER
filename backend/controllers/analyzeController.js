const axios = require('axios');

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
