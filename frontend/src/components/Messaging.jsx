import React, { useState } from 'react';
import ConversationList from '../functions/ConversationList';
import MainChatPanel from './MainChatPanel';

function Messaging() {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Sidebar for Conversation List */}
      <div className="w-1/3 bg-white border-r border-gray-200">
        <ConversationList onSelectConversation={setSelectedConversationId} />
      </div>
      
      {/* Main Chat Panel */}
      <div className="w-2/3 flex flex-col">
        {selectedConversationId ? (
          <MainChatPanel conversationId={selectedConversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Messaging;
