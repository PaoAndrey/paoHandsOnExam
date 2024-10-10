import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';

const Chat = () => {
  const { user } = useAuth();
  const { messages, sendMessage, onlineUsers } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const chatContainerRef = useRef();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '' && selectedUser) {
      sendMessage(inputMessage, selectedUser.email);
      setInputMessage('');
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      (message.sender === user?.email && message.recipient === selectedUser?.email) ||
      (message.sender === selectedUser?.email && message.recipient === user?.email)
  );

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg">
      <div className="w-1/4 border-r">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-xl font-semibold">Online Users</h2>
        </div>
        <ul className="p-4">
          {onlineUsers.map((onlineUser) => (
            <li
              key={onlineUser.email}
              className={`cursor-pointer p-2 rounded ${
                selectedUser?.email === onlineUser.email ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedUser(onlineUser)}
            >
              {onlineUser.email} {onlineUser.role === 'admin' ? '(Admin)' : ''}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col w-3/4">
        <div className="bg-blue-600 text-white py-4 px-6">
          <h2 className="text-xl font-semibold">
            {selectedUser ? `Chat with ${selectedUser.email}` : 'Select a user to chat'}
          </h2>
        </div>
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === user?.email ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === user?.email
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="font-semibold">{message.sender}</p>
                <p>{message.text}</p>
                <p className="text-xs text-right mt-1 opacity-75">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={selectedUser ? "Type a message..." : "Select a user to chat"}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedUser}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              disabled={!selectedUser}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;