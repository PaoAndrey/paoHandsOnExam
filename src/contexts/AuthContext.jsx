import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { email: 'admin@gmail.com', password: 'adminpass', role: 'admin' },
  ]);
  const [announcements, setAnnouncements] = useState([]);

  const signUp = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return false;
    }
    const newUser = { email, password, role: 'user' };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return true;
  };

  const login = (email, password) => {
    const existingUser = users.find(user => user.email === email && user.password === password);
    if (existingUser) {
      setUser({ email: existingUser.email, role: existingUser.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const createAnnouncement = (text) => {
    const newAnnouncement = { id: Date.now(), text, date: new Date() };
    setAnnouncements(prev => [...prev, newAnnouncement]);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout, users, createAnnouncement, announcements }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);