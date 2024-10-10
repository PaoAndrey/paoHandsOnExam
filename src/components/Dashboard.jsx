import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import UserList from './UserList';
import AnnouncementList from './AnnouncementList';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard, {user.email}!</h2>
      <p className="mb-4">Role: {user.role}</p>
      
      {user.role === 'admin' && (
        <>
          <p className="mb-4">As an admin, you have access to manage users and view announcements.</p>
          <UserList />
        </>
      )}
      
      <AnnouncementList />
      
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;