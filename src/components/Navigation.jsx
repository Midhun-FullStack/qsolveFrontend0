import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, User, House, BookOpen, Package, X } from 'lucide-react';
import * as bootstrap from 'bootstrap';

const Navigation = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentScreen = location.pathname.split('/')[1] || 'home';
  const [offcanvasInstance, setOffcanvasInstance] = useState(null);

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
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary d-lg-none me-2"
            type="button"
            onClick={handleMenuClick}
          >
            <Menu size={20} />
          </button>
          
          <span className="navbar-brand qsolve-brand mb-0">Q SOLVE</span>
          
          <div className="d-none d-lg-flex navbar-nav ms-auto">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`nav-link btn btn-link text-decoration-none ${
                  currentScreen === id ? 'active fw-bold' : ''
                }`}
                onClick={() => navigate(`/${id}`)}
              >
                <Icon size={18} className="me-1" />
                {label}
              </button>
            ))}
            
            {user && (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="24"
                    height="24"
                  />
                  {user.name}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate('/profile')}
                    >
                      <User size={16} className="me-2" />
                      Profile
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={onLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Side Navigation (Mobile) */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="sideNavigation"
        aria-labelledby="sideNavigationLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title qsolve-brand" id="sideNavigationLabel">
            Q SOLVE
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="list-group list-group-flush">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`list-group-item list-group-item-action border-0 ${
                  currentScreen === id ? 'active' : ''
                }`}
                onClick={() => handleNavClick(id)}
              >
                <Icon size={18} className="me-2" />
                {label}
              </button>
            ))}
          </div>
          
          {user && (
            <div className="mt-auto pt-3">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <div>
                  <div className="fw-bold">{user.name}</div>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  onLogout();
                  navigate('/landing');
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;