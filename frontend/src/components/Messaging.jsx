import React, { useState } from 'react';
import ConversationList from '../functions/ConversationList';
import MainChatPanel from './MainChatPanel';
import ResizablePanel from '../functions/ResizablePanel';

function Messaging() {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  return (
    <div className="h-screen bg-gray-100 flex">
      <ResizablePanel>
        {/* Sidebar for Conversation List */}
        <div className="bg-white border-r border-gray-200 h-full">
          <ConversationList onSelectConversation={setSelectedConversationId} />
        </div>
        
        {/* Main Chat Panel */}
        <div className="flex flex-col h-full">
          {selectedConversationId ? (
            <MainChatPanel conversationId={selectedConversationId} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </ResizablePanel>
    </div>
  );
}

export default Messaging;