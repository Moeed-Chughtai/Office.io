import React, { useEffect, useState } from 'react';

const ConversationList = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    // Fetch conversations from the Flask backend
    const fetchConversations = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/conversations');
        if (!response.ok) {
          throw new Error('Failed to fetch conversations');
        }
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    
    fetchConversations();
  }, []);

  return (
    <div className="h-full p-4 space-y-4 overflow-y-auto">
      <div className="font-bold text-gray-700 text-xl mb-2">Messages</div>
      <div className="space-y-2">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectConversation(convo.id)}
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="font-medium text-gray-800">
                {convo.participants.join(', ')}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {convo.lastMessage}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
