import { useState, useEffect, memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, House, BookOpen, Package, X, Download, LogOut, Settings, Sparkles, Search } from 'lucide-react';
import * as bootstrap from 'bootstrap';

// Simplified throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const Navigation = memo(({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentScreen = location.pathname.split('/')[1] || 'home';
  const [offcanvasInstance, setOffcanvasInstance] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Throttled mouse move for better performance
  const throttledMouseMove = useCallback(
    throttle((e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [throttledMouseMove]);

  useEffect(() => {
    const offcanvasElement = document.getElementById('sideNavigation');
    if (offcanvasElement) {
      const instance = new bootstrap.Offcanvas(offcanvasElement);
      setOffcanvasInstance(instance);
      
      return () => {
        instance.dispose();
      };
    }
  }, []);

  const handleMenuClick = () => {
    if (offcanvasInstance) {
      offcanvasInstance.show();
    }
  };

  const handleNavClick = (screen) => {
    if (offcanvasInstance) {
      offcanvasInstance.hide();
    }
    navigate(`/${screen}`);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'study-materials', label: 'Study Materials', icon: Package },
    
    { id: 'about', label: 'About', icon: BookOpen },
   
  ];

  const styles = `
    @keyframes brandGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      50% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }

    @keyframes navFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-2px); }
    }

    .navbar-container {
      background: rgba(15, 20, 40, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(99, 102, 241, 0.2);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      position: sticky;
      top: 0;
      z-index: 1050;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navbar-container:hover {
      border-bottom-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 12px 48px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .brand-logo {
      animation: brandGlow 3s ease-in-out infinite;
      letter-spacing: -0.025em;
      font-weight: 800;
      font-size: 1.75rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .brand-logo:hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }

    .mobile-menu-btn {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
      color: #6366f1;
      padding: 1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-menu-btn:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%);
      border-color: rgba(99, 102, 241, 0.5);
      transform: scale(1.05);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.2);
    }

    .nav-item {
      background: rgba(15, 20, 40, 0.6);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 16px;
      color: #e2e8f0;
      padding: 0.875rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.025em;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.05);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%);
      border-color: rgba(99, 102, 241, 0.4);
      color: #6366f1;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
      transform: translateY(-2px);
    }

    .nav-item:hover:not(.active) {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%);
      border-color: rgba(99, 102, 241, 0.3);
      color: #6366f1;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.15);
    }

    .nav-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
      transition: left 0.6s ease;
    }

    .nav-item:hover::before {
      left: 100%;
    }

    .nav-item.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 3px;
      background: linear-gradient(90deg, #6366f1, #8b5cf6);
      border-radius: 2px;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }

    .user-dropdown {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
      color: #6366f1;
      padding: 0.875rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
      letter-spacing: 0.025em;
      position: relative;
      overflow: hidden;
    }

    .user-dropdown:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%);
      border-color: rgba(99, 102, 241, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2);
    }

    .user-dropdown::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.6s ease;
    }

    .user-dropdown:hover::before {
      left: 100%;
    }

    .dropdown-menu-custom {
      background: rgba(15, 20, 40, 0.98);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 20px;
      padding: 1rem;
      margin-top: 0.75rem;
      box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(99, 102, 241, 0.15);
      min-width: 220px;
    }

    .dropdown-item-custom {
      color: #e2e8f0;
      padding: 0.875rem 1.25rem;
      border-radius: 12px;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 0.875rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 500;
      font-size: 0.9rem;
      letter-spacing: 0.025em;
      position: relative;
      overflow: hidden;
    }

    .dropdown-item-custom:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      color: #6366f1;
      transform: translateX(6px);
      border: 1px solid rgba(99, 102, 241, 0.2);
    }

    .dropdown-item-custom.danger {
      color: #ef4444;
    }

    .dropdown-item-custom.danger:hover {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .sidebar-container {
      background: rgba(15, 20, 40, 0.98);
      backdrop-filter: blur(20px);
      border: none;
      border-right: 1px solid rgba(99, 102, 241, 0.2);
      width: 360px;
      box-shadow: 8px 0 64px rgba(0, 0, 0, 0.4);
    }

    .sidebar-header {
      border-bottom: 1px solid rgba(99, 102, 241, 0.2);
      padding: 2rem 1.5rem 1.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, transparent 100%);
      position: relative;
    }

    .sidebar-close-btn {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
    }

    .sidebar-close-btn:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%);
      border-color: rgba(99, 102, 241, 0.5);
      transform: scale(1.1);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.2);
    }

    .sidebar-nav-item {
      width: 100%;
      background: rgba(15, 20, 40, 0.6);
      border: 1px solid rgba(99, 102, 241, 0.1);
      border-radius: 16px;
      color: #e2e8f0;
      padding: 1.125rem 1.5rem;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 500;
      font-size: 1rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: left;
      position: relative;
      overflow: hidden;
      letter-spacing: 0.025em;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.05);
    }

    .sidebar-nav-item.active {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%);
      border-color: rgba(99, 102, 241, 0.4);
      color: #6366f1;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
      transform: translateX(6px);
    }

    .sidebar-nav-item:hover:not(.active) {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%);
      border-color: rgba(99, 102, 241, 0.25);
      color: #6366f1;
      transform: translateX(6px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.15);
    }

    .sidebar-nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, #6366f1, #8b5cf6);
      border-radius: 0 2px 2px 0;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }

    .user-profile-card {
      margin-top: auto;
      padding: 2rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 20px;
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
      position: relative;
      overflow: hidden;
    }

    .user-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      color: #ffffff;
      font-weight: 700;
      font-size: 1.3rem;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    .profile-action-btn {
      flex: 1;
      border-radius: 12px;
      padding: 0.875rem;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      letter-spacing: 0.025em;
      position: relative;
      overflow: hidden;
    }

    .profile-action-btn.primary {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #6366f1;
    }

    .profile-action-btn.primary:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%);
      border-color: rgba(99, 102, 241, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.2);
    }

    .profile-action-btn.danger {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #ef4444;
    }

    .profile-action-btn.danger:hover {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.3) 100%);
      border-color: rgba(239, 68, 68, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      {/* Navbar Cursor Glow */}
      <div
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 999,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Top Navigation Bar */}
      <nav className="navbar-container" style={{ padding: '1.25rem 0' }}>
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between">
            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn d-lg-none me-3"
              type="button"
              onClick={handleMenuClick}
            >
              <Menu size={20} />
            </button>
            
            {/* Brand */}
            <div 
              className="brand-logo"
              onClick={() => navigate('/home')}
            >
              <Sparkles size={24} style={{ color: '#6366f1' }} />
              Q SOLVE
            </div>
            
            {/* Desktop Navigation */}
            <div className="d-none d-lg-flex align-items-center gap-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`nav-item ${currentScreen === id ? 'active' : ''}`}
                  onClick={() => {
                    console.log(`Navigating to /${id}`);
                    navigate(`/${id}`);
                  }}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
              
              {/* User Dropdown */}
              {user && (
                <div className="dropdown ms-4">
                  <button
                    className="user-dropdown dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User size={16} />
                    {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-custom">
                    <li>
                      <button
                        className="dropdown-item-custom"
                        onClick={() => navigate('/profile')}
                      >
                        <Settings size={16} />
                        Profile Settings
                      </button>
                    </li>
                    <li><hr style={{ margin: '0.75rem 0', borderColor: 'rgba(99, 102, 241, 0.2)', opacity: 0.5 }} /></li>
                    <li>
                      <button 
                        className="dropdown-item-custom danger"
                        onClick={onLogout}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Side Navigation (Mobile) */}
      <div
        className="offcanvas offcanvas-start sidebar-container"
        tabIndex="-1"
        id="sideNavigation"
        aria-labelledby="sideNavigationLabel"
      >
        {/* Sidebar Background Effects */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)
            `,
            zIndex: -1
          }}
        />

        {/* Header */}
        <div className="offcanvas-header sidebar-header">
          <h5 
            className="offcanvas-title brand-logo" 
            id="sideNavigationLabel"
            style={{ fontSize: '1.5rem' }}
          >
            <Sparkles size={20} style={{ color: '#6366f1' }} />
            Q SOLVE
          </h5>
          <button
            type="button"
            className="btn-close sidebar-close-btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <X size={16} style={{ color: '#6366f1' }} />
          </button>
        </div>

        {/* Body */}
        <div 
          className="offcanvas-body"
          style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Navigation Items */}
          <div style={{ marginBottom: '2rem' }}>
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`sidebar-nav-item ${currentScreen === id ? 'active' : ''}`}
                onClick={() => {
                  console.log(`Mobile nav: Navigating to /${id}`);
                  handleNavClick(id);
                }}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
          
          {/* User Profile Section */}
          {user && (
            <div className="user-profile-card">
              <div className="d-flex align-items-center mb-3">
                <div className="user-avatar">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={{ 
                    fontWeight: '700', 
                    color: '#ffffff',
                    fontSize: '1rem',
                    letterSpacing: '0.025em'
                  }}>
                    {user.name}
                  </div>
                  <small style={{ 
                    color: '#cbd5e1',
                    opacity: '0.8'
                  }}>
                    {user.email}
                  </small>
                </div>
              </div>
              
              <div className="d-flex gap-3">
                <button
                  onClick={() => navigate('/profile')}
                  className="profile-action-btn primary"
                >
                  <Settings size={16} />
                  Profile
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    navigate('/landing');
                  }}
                  className="profile-action-btn danger"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;