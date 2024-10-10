import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-elegant-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-elegant-100 transition-colors">Discussion Platform</Link>
          <button className="lg:hidden focus:outline-none" onClick={toggleNavbar}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
            {user && (
              <ul className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
                <li><Link to="/dashboard" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Dashboard</Link></li>
                <li><Link to="/chat" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Live Chat</Link></li>
                {user.role === 'admin' && (
                  <>
                    <li><Link to="/users" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Registered Users</Link></li>
                    <li><Link to="/create-announcement" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Create Announcement</Link></li>
                    <li><Link to="/create-poll" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Create Poll</Link></li>
                  </>
                )}
                <li><Link to="/vote-poll" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Vote Poll</Link></li>
                <li><Link to="/poll-result" className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Poll Result</Link></li>
                <li><button onClick={logout} className="block py-2 px-4 text-white hover:bg-elegant-600 rounded transition-colors">Logout</button></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;