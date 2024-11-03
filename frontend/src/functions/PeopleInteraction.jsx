// src/functions/PeopleInteraction.js
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

function PeopleInteraction({ name, summary, onClose }) {
  return (
    <UserPopup name={name} summary={summary} onClose={onClose} />
  );
}

export default PeopleInteraction;
