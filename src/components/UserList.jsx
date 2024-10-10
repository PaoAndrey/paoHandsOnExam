import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserList = () => {
  const { users } = useAuth();

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-2">Registered Users</h3>
      <ul className="list-disc pl-5">
        {users.map((user, index) => (
          <li key={index}>{user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;