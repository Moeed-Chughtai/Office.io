import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);

  // Handle PDF upload
  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/upload_pdf", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPdfUploaded(true);
        setAnswer("PDF uploaded and processed successfully!");
      } catch (error) {
        setAnswer("Failed to upload PDF. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle question submission
  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    if (!pdfUploaded) {
      setAnswer("Please upload a PDF first.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/ask_question", { question });
      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer("Failed to get an answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>PDF Chatbot</h2>

      {/* PDF Upload Section */}
      <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
      {loading && <p>Processing PDF...</p>}
      <p>{answer}</p>

      {/* Question Section */}
      {pdfUploaded && (
        <form onSubmit={handleQuestionSubmit} style={{ marginTop: "20px" }}>
          <label>
            <strong>Ask a question about the PDF:</strong>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here"
              style={{ width: "100%", padding: "10px", marginTop: "10px" }}
            />
          </label>
          <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
            Ask
          </button>
        </form>
      )}

      {/* Display Answer */}
      {answer && (
        <div style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}>
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
