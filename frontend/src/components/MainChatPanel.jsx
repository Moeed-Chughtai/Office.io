import React, { useEffect, useState } from 'react';

const MainChatPanel = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const senderId = "currentUserId";  // Replace with the actual user ID if available

  useEffect(() => {
    // Fetch messages from the Flask backend for the selected conversation
    const fetchMessages = async () => {
      if (conversationId) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/conversations/${conversationId}/messages`);
          const data = await response.json();
          setMessages(data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };

    fetchMessages();
  }, [conversationId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        senderId,
        timestamp: new Date().toISOString(),
      };

      try {
        // Send message to the backend
        const response = await fetch(`http://127.0.0.1:5000/conversations/${conversationId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        if (response.ok) {
          // Update local message list after successful POST request
          setMessages((prevMessages) => [...prevMessages, message]);
          setNewMessage(''); // Clear input field
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.senderId === senderId ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded-lg ${msg.senderId === senderId ? 'bg-blue-200' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MainChatPanel;
