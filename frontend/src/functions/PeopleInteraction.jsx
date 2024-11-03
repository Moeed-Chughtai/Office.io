import React, { useState } from 'react';

function UserPopup({ name, summary, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{name}</h2>
        <p className="text-gray-700 text-center mb-6">{summary}</p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => alert(`Messaging ${name}`)}
          >
            Message me
          </button>
          <button
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: '', summary: '' });

  const handleClick = (name, summary) => {
    setPopupData({ name, summary });
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div>
        {/* Replace these with actual clickable elements that trigger the popup */}
        <button
          onClick={() => handleClick('John Doe', 'John is currently working on a new React project to enhance frontend development skills.')}
          className="text-blue-500 underline"
        >
          Click to see details of John Doe
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <UserPopup
          name={popupData.name}
          summary={popupData.summary}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
