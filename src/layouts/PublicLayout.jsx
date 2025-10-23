import React from 'react';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
  const location = useLocation();
  
  // Pages that should NOT have footer
  const noFooterPages = ['/landing', '/signin', '/signup', '/auth', '/login', '/register'];
  const shouldShowFooter = !noFooterPages.includes(location.pathname);

  return (
    <div className="public-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem 0'
      }}>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
