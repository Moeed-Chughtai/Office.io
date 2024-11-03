import React, { useState, useEffect } from 'react';

const ChatPopup = () => {
  const [isContactListOpen, setIsContactListOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await fetch('http://127.0.0.1:5000/conversations');
      const data = await response.json();
      setConversations(data);
    };
    fetchConversations();
  }, []);

  const handleConversationSelect = async (conversation) => {
    setSelectedConversation(conversation);
    setIsContactListOpen(false);
    
    const response = await fetch(`http://127.0.0.1:5000/conversations/${conversation.id}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const newMessageData = {
      text: newMessage,
      senderId: 'UserA', // Adjust with current user's ID as needed
      timestamp: new Date().toISOString()
    };

    const response = await fetch(
      `http://127.0.0.1:5000/conversations/${selectedConversation.id}/messages`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessageData)
      }
    );

    if (response.ok) {
      setMessages([...messages, newMessageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {!isContactListOpen && !selectedConversation && (
        <div onClick={() => setIsContactListOpen(true)} className="cursor-pointer w-72 bg-white text-black text-center py-2 rounded-lg shadow-lg hover:bg-blue-300 hover:text-black">
          Contacts
        </div>
      )}

      {isContactListOpen && !selectedConversation && (
        <div className="p-3 space-y-3 overflow-y-auto h-72 w-72">
          <div className="sticky top-0 bg-white z-10 p-2 border-b">
            <div className="flex justify-between items-center">
              <div className="font-bold text-gray-700">Conversations</div>
              <button onClick={() => setIsContactListOpen(false)} className="text-gray-500 hover:text-gray-800">
                ✕
              </button>
            </div>
          </div>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleConversationSelect(conv)}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className="font-medium text-gray-800">{conv.name}</div>
                <div className="text-xs text-gray-500">{conv.lastMessage}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedConversation && (
        <div className="flex flex-col h-64 w-96">
          <div className="p-3 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => { setSelectedConversation(null); setMessages([]); }} className="text-gray-500 hover:text-gray-800 text-lg">
                ←
              </button>
              <div>
                <div className="font-medium text-gray-800">{selectedConversation.name}</div>
              </div>
            </div>
            <button onClick={() => setSelectedConversation(null)} className="text-gray-500 hover:text-gray-800">✕</button>
          </div>

          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 ${msg.senderId === 'UserA' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.senderId === 'UserA' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage} className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
