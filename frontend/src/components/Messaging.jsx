import React from 'react'
import ConversationList from '../functions/ConversationList';
import ChatPanel from './ChatPanel';

function Messaging() {
    return (
        <div className="h-screen bg-gray-100 flex">
          {/* Sidebar for Conversation List */}
            <div className="w-1/3 bg-white border-r border-gray-200">
                <ConversationList />
            </div>
          
          {/* Main Chat Panel */}
            <div className="w-2/3 flex flex-col">
                <ChatPanel />
            </div>
        </div>
    );
}

export default Messaging