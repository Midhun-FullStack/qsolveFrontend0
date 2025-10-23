import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = ({ user, onLogout }) => {
  const location = useLocation();
  
  // Pages that should NOT have footer
  const noFooterPages = ['/profile', '/settings'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  return (
    <div className="main-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation user={user} onLogout={onLogout} />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default MainLayout;