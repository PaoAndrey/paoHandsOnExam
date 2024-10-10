import React, { createContext, useState, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext'; // Make sure this import is correct

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth(); // Use the useAuth hook

  useEffect(() => {
    if (!user) return; // Only connect to socket if user is authenticated

    const newSocket = io('http://localhost:3000'); // Replace with your WebSocket server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]); // Depend on user to reconnect when user changes

  useEffect(() => {
    if (!socket) return;

    socket.on('message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (text: string) => {
    if (socket && user) {
      const message: Message = {
        id: Date.now().toString(),
        user: user.name || 'Anonymous', // Use user.name if available, otherwise 'Anonymous'
        text,
        timestamp: new Date(),
      };
      socket.emit('message', message);
      setMessages(prevMessages => [...prevMessages, message]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
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