import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Chat from './Chat';
import Poll from './Poll';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Welcome, {user?.name}</h5>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <Chat />
        </div>
        <div className="col-md-3">
          <Poll />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;