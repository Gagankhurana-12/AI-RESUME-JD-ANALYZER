# 📄 JD & Resume Analyser

The **JD & Resume Analyser** is an AI-powered web application that evaluates resumes against a given **Job Description (JD)** to measure compatibility, identify skill gaps, and suggest improvements to increase hiring chances.

This tool is designed to help **job seekers** create **ATS-friendly resumes** and for **recruiters** to quickly assess candidate fit.

---

## ✨ Features
- 📤 **Resume Upload** — Supports PDF/DOCX formats.
- 📝 **JD Input** — Paste or upload the job description.
- 📊 **ATS Score Calculation** — Measures how well the resume matches the JD.
- 🔍 **Keyword Matching** — Highlights missing keywords/skills.
- 💡 **Improvement Suggestions** — AI-generated tips to improve resume match.
- 🧠 **AI-Powered** — Uses Hugging Face NLP models for text analysis.
- 📈 **Detailed Report** — Shows match percentage, skills matched, and skill gaps.

---

## 🛠 Tech Stack
### **Frontend**
- ⚛️ React.js
- 🎨 Tailwind CSS / Bootstrap
- 🔄 Axios (API calls)

### **Backend**
- 🟢 Node.js
- 🚂 Express.js
- 🗃 MongoDB (optional for storing history)
- 📄 pdf-parse & docx-parser (for extracting resume content)
- 🤖 Hugging Face Transformers (for NLP & similarity checking)

---

## 📂 Project Structure
```plaintext
jd-resume-analyser/
├── frontend/                  # React UI for resume & JD input
│   ├── src/
│   │   ├── components/        # UploadForm, ResultsCard, SkillGapList, etc.
│   │   ├── pages/             # Home, Results
│   │   └── App.js
│   └── package.json
│
├── backend/                   # Node + Express API
│   ├── controllers/           # resumeController.js, jdController.js
│   ├── services/              # textExtraction.js, nlpAnalysis.js
│   ├── routes/                # resumeRoutes.js, jdRoutes.js
│   ├── config/                # huggingfaceConfig.js
│   ├── server.js
│   └── package.json
│
└── README.md
