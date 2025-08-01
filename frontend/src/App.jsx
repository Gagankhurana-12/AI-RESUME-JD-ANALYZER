import { useState } from 'react';
import axios from 'axios';

function App() {
  const [resume, setResume] = useState('');
  const [jd, setJd] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume.trim() || !jd.trim()) {
      alert('Please enter both resume and job description.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/analyze`, { resume, jd });
      setResult(res.data.result);
    } catch (err) {
      setResult('Error connecting to Gemini API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: "2rem", 
      fontFamily: "system-ui, -apple-system, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#f8fafc",
      minHeight: "100vh"
    }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#1e293b", 
        marginBottom: "2rem",
        fontSize: "2.5rem",
        fontWeight: "700"
      }}>
        🧠 Resume & JD AI Analyzer
      </h1>

      <form onSubmit={handleSubmit} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "1.5rem", 
        maxWidth: "800px",
        margin: "0 auto 2rem auto"
      }}>
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "600",
            color: "#374151"
          }}>
            Resume Content
          </label>
          <textarea
            rows="8"
            placeholder="Paste your resume here..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
              backgroundColor: "white"
            }}
          />
        </div>
        
        <div>
          <label style={{ 
            display: "block", 
            marginBottom: "0.5rem", 
            fontWeight: "600",
            color: "#374151"
          }}>
            Job Description
          </label>
          <textarea
            rows="8"
            placeholder="Paste the job description here..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              border: "2px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
              backgroundColor: "white"
            }}
          />
        </div>
        
        <button type="submit" style={{ 
          padding: "1rem 2rem", 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white", 
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
        onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
        >
          🔍 Analyze Resume vs JD
        </button>
      </form>

      {loading && (
        <div style={{ 
          textAlign: "center", 
          padding: "2rem",
          color: "#6b7280"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
          <p style={{ fontSize: "18px" }}>Analyzing with Gemini AI...</p>
        </div>
      )}

      {result && (
        <div style={{ 
          marginTop: "2rem", 
          background: "white",
          padding: "2rem", 
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb"
        }}>
          <div style={{
            whiteSpace: "pre-wrap",
            lineHeight: "1.6",
            color: "#374151",
            fontSize: "15px"
          }}>
            {result}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
