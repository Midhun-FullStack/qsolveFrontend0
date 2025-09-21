import React from 'react';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="main-layout">
      <Navigation user={user} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;