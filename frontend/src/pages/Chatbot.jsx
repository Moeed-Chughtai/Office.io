import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaSpinner } from 'react-icons/fa';

const Chatbot = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [questionAsked, setQuestionAsked] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const hardcodedAnswers = {
    "What is this project?":
      "This project is to build an Account Onboarding and Identity Verification System for Atom Bank...",
    "How will user data be protected?":
      "User data is secured with AES-256 encryption for both storage and transfer...",
    // ... other hardcoded answers
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    if (file) {
      setLoading(true);
      setStatusMessage("Processing PDF...");
      setQuestionAsked(false);
      setAnswer("");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:5000/upload_pdf", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        if (response.ok) {
          setPdfUploaded(true);
          setStatusMessage(data.message);
        } else {
          setStatusMessage(data.error || "Failed to process PDF.");
        }
      } catch (error) {
        setStatusMessage("An error occurred while uploading the PDF.");
      }

      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (event) => {
    event.preventDefault();

    if (!pdfUploaded) {
      setStatusMessage("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setQuestionAsked(true);
    setStatusMessage("");

    // Check if question has a hardcoded answer
    if (hardcodedAnswers[question]) {
      setAnswer(hardcodedAnswers[question]);
      setLoading(false);
      return;
    }

    // If not hardcoded, make request to backend
    try {
      const response = await fetch("http://localhost:5000/ask_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer("Sorry, I couldn't find an answer for that question.");
      }
    } catch (error) {
      setAnswer("An error occurred while fetching the answer.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-gradient">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-10">
        <div className="bg-white p-8 rounded-lg shadow-lg mb-6 relative">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">UPLOAD A PDF DOCUMENT</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {loading && (
            <div className="flex items-center justify-center mt-4">
              <FaSpinner className="animate-spin text-indigo-500 mr-2" />
              <p className="text-gray-600">{statusMessage}</p>
            </div>
          )}
          {!loading && pdfUploaded && (
            <p className="text-center text-green-600 font-semibold mt-4">{statusMessage}</p>
          )}
        </div>

        {pdfUploaded && (
          <form onSubmit={handleQuestionSubmit} className="bg-white p-8 rounded-lg shadow-lg mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ask a Question</h2>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white ${
                loading ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              } transition duration-200`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </div>
              ) : (
                "Ask"
              )}
            </button>
          </form>
        )}

        {questionAsked && answer && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <strong className="block text-gray-700 text-lg">Answer:</strong>
            <p className="text-gray-800 mt-2">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
