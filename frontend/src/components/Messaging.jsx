import React, { useState } from 'react';
import ConversationList from '../functions/ConversationList';
import MainChatPanel from './MainChatPanel';
import ResizablePanel from '../functions/ResizablePanel';

function Messaging({ userType }) {
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  return (
    <div className="h-screen w-screen bg-gray-100 flex">
      <ResizablePanel>
        <div className="bg-white border-r border-gray-200 h-full">
          <ConversationList 
            onSelectConversation={setSelectedConversationId} 
            selectedConversationId={selectedConversationId} 
          />
        </div>
        <div className="flex flex-col h-full w-full">
          {selectedConversationId ? (
            <MainChatPanel conversationId={selectedConversationId} userType={userType} />
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
