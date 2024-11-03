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
      "This project is to build an Account Onboarding and Identity Verification System for Atom Bank. It aims to streamline the account creation process with secure, user-friendly features that meet regulatory standards like KYC and AML, while reducing onboarding time to under 10 minutes.",
    "How will user data be protected?":
      "User data is secured with AES-256 encryption for both storage and transfer, multi-factor authentication (MFA), and GDPR-compliant handling, ensuring robust security throughout the onboarding process.",
    "Who is the best to contact for assistance with an API issue?":
      "For debugging API issues, the primary point of contact would be the Backend Tech Lead. They oversee the server-side code and API development and can provide guidance on troubleshooting, best practices, and debugging strategies. If the issue involves integration with frontend components, the Frontend Tech Lead can also offer insights into client-server communication aspects.",
    "What are the core technologies?":
      "The team primarily uses React for the frontend, Node.js for the backend, PostgreSQL and MongoDB for databases, and AWS for infrastructure, with containerization handled by Docker and Kubernetes."
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    if (file) {
      setLoading(true);
      setStatusMessage("Processing PDF...");
      setQuestionAsked(false);
      setAnswer("");

      setTimeout(() => {
        setPdfUploaded(true);
        setStatusMessage("PDF uploaded and processed successfully!");
        setLoading(false);
      }, 4000); // Reduced processing delay for demonstration
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

    setTimeout(() => {
      const responseAnswer = hardcodedAnswers[question] || "I'm sorry, I don't have an answer for that question.";
      setAnswer(responseAnswer);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-linear-gradient">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-10">
        {/* PDF Upload Section */}
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

        {/* Question Section */}
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

        {/* Display Answer */}
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
