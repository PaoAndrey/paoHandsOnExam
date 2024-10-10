import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user, users } = useAuth();

  useEffect(() => {
    // Simulate online users (in a real app, this would be managed by a backend)
    setOnlineUsers(users.filter(u => u.email !== user?.email));
  }, [users, user]);

  const sendMessage = (text, recipientEmail) => {
    if (user) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user.email,
        recipient: recipientEmail,
        text,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, onlineUsers }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};