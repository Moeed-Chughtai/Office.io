import React, { useState } from 'react';

// Sample data for users
const users = [
  { id: 1, name: 'Alice Smith', status: 'Active now' },
  { id: 2, name: 'Bob Johnson', status: 'Offline' },
  { id: 3, name: 'Cathy Lee', status: 'Active now' },
  { id: 4, name: 'David Kim', status: 'Offline' },
];

const ChatPopup = () => {
  const [isContactListOpen, setIsContactListOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleContactSelect = (user) => {
    setSelectedUser(user);
    setIsContactListOpen(false);
  };

  const handleBackToContacts = () => {
    setSelectedUser(null);
    setIsContactListOpen(true);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Collapsed Contact Tab */}
      {!isContactListOpen && !selectedUser && (
        <div
          onClick={() => setIsContactListOpen(true)}
          className="cursor-pointer w-72 bg-blue-500 text-white text-center py-2 rounded-lg shadow-lg"
        >
          Contacts
        </div>
      )}

      {/* Contact List Section */}
      {isContactListOpen && !selectedUser && (
        <div className="p-3 space-y-3 overflow-y-auto h-64 w-72">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="font-bold text-gray-700">Contacts</div>
            <button onClick={() => setIsContactListOpen(false)} className="text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleContactSelect(user)}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Section */}
      {selectedUser && (
        <div className="flex flex-col h-64 w-96">
          {/* Chat Header */}
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={handleBackToContacts} className="text-gray-500 hover:text-gray-800 text-lg">
                ←
              </button>
              <div>
                <div className="font-medium text-gray-800">{selectedUser.name}</div>
                <div className="text-xs text-gray-500">{selectedUser.status}</div>
              </div>
            </div>
            <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-800">
              ✕
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            <div className="text-gray-400 text-center">No messages yet</div>
          </div>

          {/* Message Input */}
          <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
