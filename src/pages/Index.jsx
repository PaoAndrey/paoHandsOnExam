import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ChatProvider } from '../contexts/ChatContext';
import { PollProvider } from '../contexts/PollContext';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

const Index = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <PollProvider>
          <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
            <Login />
            <Dashboard />
          </div>
        </PollProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default Index;