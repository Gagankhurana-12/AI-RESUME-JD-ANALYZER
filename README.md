🧠 Resume JD Analyzer

An AI-powered web app that compares your resume with a job description (JD) using Google Gemini API, helping you identify skill gaps, missing keywords, and improving your resume’s ATS compatibility.

🚀 Features

✅ Upload your resume (PDF/DOCX)
✅ Paste or upload job descriptions
✅ AI-powered comparison using Gemini API
✅ Match score and improvement suggestions
✅ Missing skills & keyword analysis
✅ Clean and modern UI (React + Tailwind)
✅ Ready for full-stack deployment (Render + Netlify)

🛠️ Tech Stack
Category	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
AI Model	Google Gemini API
File Handling	Multer
Deployment	Render (Backend), Netlify (Frontend)


📂 Folder Structure
resume-jd-analyzer/
│
├── backend/
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── routes/
│   │   └── analyzeRoute.js
│   ├── server.js
│   ├── package.json
│   ├── render.yaml          # For Render deployment
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── eslint.config.js
│   ├── netlify.toml         # For Netlify deployment
│   ├── package.json
│   └── .gitignore
│
└── README.md


⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/Gagankhurana-12/AI-RESUME-JD-ANALYZER.git
cd AI-RESUME-JD-ANALYZER

2️⃣ Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

PORT=5000
GEMINI_API_KEY=your_gemini_api_key


Start backend server:

npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start


The app runs on:

Frontend → http://localhost:3000

Backend → http://localhost:5000

🧠 API Endpoint

POST /api/analyze
Analyzes resume and JD using Gemini.

Request Body:

{
  "resumeText": "Your resume content",
  "jobDescription": "The job description text"
}


Response Example:

{
  "matchScore": 87,
  "missingKeywords": ["React", "Node.js", "REST API"],
  "suggestions": "Add project details emphasizing API development and teamwork."
}

🖥️ UI Overview
Upload Resume	AI Analysis Result

	
🧮 How It Works

User uploads their resume and provides a JD.

Backend extracts text and sends it to Gemini AI.

AI compares skills, keywords, and structure.

Result is displayed in an intuitive frontend interface.

🔮 Future Enhancements

🗂️ Multiple resume comparison

📑 PDF report export

🧾 LinkedIn profile analysis

🌐 Support for multiple languages

✨ Smart resume suggestions (auto-rewrite)

🌐 Deployment

Frontend: Deployed on Netlify using netlify.toml.

Backend: Deployed on Render using render.yaml.

👨‍💻 Author

Gagan
📍 Full Stack Developer | AI Enthusiast
🔗 LinkedIn
 • GitHub

🪪 License

This project is licensed under the MIT License.
