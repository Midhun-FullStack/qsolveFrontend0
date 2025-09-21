import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="public-layout min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
