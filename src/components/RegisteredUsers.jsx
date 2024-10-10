import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const RegisteredUsers = () => {
  const { users } = useAuth();

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="bg-white p-4 rounded shadow">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredUsers;