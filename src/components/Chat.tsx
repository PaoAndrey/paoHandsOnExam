import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';

const Chat: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Live Chat</h5>
      </div>
      <div className="card-body chat-messages" style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="card-footer">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;