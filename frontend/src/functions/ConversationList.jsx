import React from 'react';

const ConversationList = () => {
  return (
    <div className="h-full p-4 space-y-4 overflow-y-auto">
      <div className="font-bold text-gray-700 text-xl mb-2">Messages</div>
      {/* Conversation items */}
      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <div className="font-medium text-gray-800">Person {index + 1}</div>
              <div className="text-sm text-gray-500 truncate">Last message preview text...</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
