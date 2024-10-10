import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { PollProvider } from './contexts/PollContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Poll from './components/Poll';
import VotePoll from './components/VotePoll';
import PollResult from './components/PollResult';
import RegisteredUsers from './components/RegisteredUsers';
import CreateAnnouncement from './components/CreateAnnouncement';
import './App.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <PollProvider>
            <Router>
              <div className="app-container flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow container mt-4">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
                    <Route path="/create-poll" element={<AdminRoute><Poll /></AdminRoute>} />
                    <Route path="/vote-poll" element={<PrivateRoute><VotePoll /></PrivateRoute>} />
                    <Route path="/poll-result" element={<PrivateRoute><PollResult /></PrivateRoute>} />
                    <Route path="/users" element={<AdminRoute><RegisteredUsers /></AdminRoute>} />
                    <Route path="/create-announcement" element={<AdminRoute><CreateAnnouncement /></AdminRoute>} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </PollProvider>
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;