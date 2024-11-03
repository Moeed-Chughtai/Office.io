import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Chatbot = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [questionAsked, setQuestionAsked] = useState(false); // New state to track if a question was asked
  const [statusMessage, setStatusMessage] = useState(""); // Separate state for status messages

  // Hardcoded answers
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

  // Handle PDF upload
  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    setPdfFile(file);

    if (file) {
      setLoading(true);
      setStatusMessage("Processing PDF..."); // Show processing message
      setQuestionAsked(false); // Reset question asked status
      setAnswer(""); // Clear any previous answer

      // Simulate a 10-second processing delay
      setTimeout(() => {
        setPdfUploaded(true);
        setStatusMessage("PDF uploaded and processed successfully!");
        setLoading(false);
      }, 10000);
    }
  };

  // Handle question submission
  const handleQuestionSubmit = async (event) => {
    event.preventDefault();
    if (!pdfUploaded) {
      setStatusMessage("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setQuestionAsked(true); // Set question asked status to true
    setStatusMessage(""); // Clear any previous status message

    // Simulate a 5-second delay before displaying the answer
    setTimeout(() => {
      const responseAnswer = hardcodedAnswers[question] || "I'm sorry, I don't have an answer for that question.";
      setAnswer(responseAnswer);
      setLoading(false);
    }, 5000);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8 font-sans">

        {/* PDF Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none p-2"
          />
          {loading && <p className="text-center text-gray-500 mt-4">{statusMessage}</p>}
          {!loading && pdfUploaded && <p className="text-center text-green-600 font-semibold mt-4">{statusMessage}</p>}
        </div>

        {/* Question Section */}
        {pdfUploaded && (
          <form onSubmit={handleQuestionSubmit} className="flex flex-col items-center">
            <label className="w-full">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your question here"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-500 text-white font-semibold py-2 rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
              }`}
            >
              Ask
            </button>
          </form>
        )}

        {/* Display Answer */}
        {questionAsked && answer && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <strong className="block text-gray-700">Answer:</strong>
            <p className="text-gray-800 mt-2">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
