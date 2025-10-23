import { useState } from 'react';
import { User, Mail, Lock, Save, Camera, CheckCircle, AlertCircle } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [profileData, setProfileData] = useState({
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    showNotification('Profile updated successfully!', 'success');
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    showNotification('Password changed successfully!', 'success');
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setLoading(false);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)', 
      minHeight: '100vh', 
      padding: '2rem 0', 
      color: '#fff' 
    }}>
      <style>{`
        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-header p {
          color: #cbd5e1;
          font-size: 1rem;
        }
        
        .card-dark {
          background: rgba(15, 20, 40, 0.8);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }
        
        .nav-tabs {
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
        }
        
        .nav-link {
          color: #cbd5e1;
          border: none;
          border-bottom: 3px solid transparent;
          padding: 1.2rem 2rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: none;
          cursor: pointer;
          font-size: 0.95rem;
          letter-spacing: 0.025em;
          position: relative;
        }
        
        .nav-link:hover {
          color: #6366f1;
          background-color: rgba(99, 102, 241, 0.05);
          transform: translateY(-1px);
        }
        
        .nav-link.active {
          color: #6366f1;
          border-bottom-color: #6366f1;
          background-color: rgba(99, 102, 241, 0.08);
          box-shadow: inset 0 -3px 0 #6366f1;
        }
        
        .form-control-dark {
          background-color: rgba(15, 20, 40, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #fff;
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }
        
        .form-control-dark:focus {
          background-color: rgba(15, 20, 40, 0.8);
          color: #fff;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15), 0 4px 12px rgba(99, 102, 241, 0.1);
          outline: none;
          transform: translateY(-1px);
        }
        
        .form-control-dark:hover:not(:focus) {
          border-color: rgba(99, 102, 241, 0.3);
          background-color: rgba(15, 20, 40, 0.7);
        }
        
        .input-group-text-dark {
          background-color: rgba(15, 20, 40, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #6366f1;
        }
        
        .form-label-dark {
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        
        .btn-primary-dark {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #fff;
          font-weight: 600;
          padding: 0.9rem 2rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          border-radius: 12px;
          font-size: 0.95rem;
          letter-spacing: 0.025em;
          box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary-dark:hover:not(:disabled) {
          background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%);
          box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.5);
        }
        
        .btn-primary-dark:active:not(:disabled) {
          transform: translateY(-1px);
          transition: transform 0.1s ease;
        }
        
        .btn-primary-dark:disabled {
          background: #555;
          border-color: #555;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
        
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid #6366f1;
          object-fit: cover;
          margin-bottom: 0.5rem;
        }
        
        .profile-img-wrapper {
          position: relative;
          display: inline-block;
        }
        
        .btn-camera {
          position: absolute;
          bottom: 0;
          right: 0;
          background-color: #6366f1;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 45px;
          height: 45px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .btn-camera:hover {
          background-color: #5855eb;
          transform: scale(1.1);
        }
        
        .alert-container {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 9999;
          animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .alert-success-dark {
          background-color: rgba(99, 102, 241, 0.2);
          border: 1px solid #6366f1;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          backdrop-filter: blur(10px);
        }
        
        .alert-danger-dark {
          background-color: rgba(239, 68, 68, 0.2);
          border: 1px solid #ef4444;
          color: #fecaca;
          padding: 1rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          backdrop-filter: blur(10px);
        }
        
        .divider {
          border-top: 1px solid rgba(99, 102, 241, 0.2);
          margin: 2rem 0;
        }
        
        .help-text {
          color: #cbd5e1;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }
      `}</style>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            {notification && (
              <div className={`alert-container ${notification.type === 'success' ? 'alert-success-dark' : 'alert-danger-dark'}`}>
                {notification.type === 'success' ? (
                  <CheckCircle size={20} style={{ color: '#6366f1', flexShrink: 0 }} />
                ) : (
                  <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
                )}
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{notification.message}</span>
              </div>
            )}

            <div className="page-header">
              <h1>Account Settings</h1>
              <p>Manage your profile and security preferences</p>
            </div>

            <div className="card card-dark">
              <div className="card-header" style={{ backgroundColor: '#0f0f0f', padding: 0 }}>
                <ul className="nav nav-tabs" role="tablist" style={{ margin: 0 }}>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                      type="button"
                      role="tab"
                    >
                      <User size={18} style={{ marginRight: '0.5rem' }} />
                      Profile
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                      onClick={() => setActiveTab('password')}
                      type="button"
                      role="tab"
                    >
                      <Lock size={18} style={{ marginRight: '0.5rem' }} />
                      Security
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content">
                {activeTab === 'profile' && (
                  <div className="tab-pane fade show active p-4" role="tabpanel">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                      <div className="profile-img-wrapper">
                        <img
                          src="https://i.pravatar.cc/150?img=1"
                          alt="Profile"
                          className="profile-image"
                        />
                        <button
                          type="button"
                          className="btn-camera"
                          title="Upload profile picture"
                        >
                          <Camera size={20} />
                        </button>
                      </div>
                      <p className="help-text">Upload a new profile picture</p>
                    </div>

                    <div className="divider"></div>

                    <div style={{ paddingTop: '0' }}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label-dark">First Name</label>
                          <input
                            type="text"
                            className="form-control-dark"
                            value={profileData.firstname}
                            onChange={(e) => setProfileData(prev => ({ ...prev, firstname: e.target.value }))}
                            style={{ width: '100%' }}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label-dark">Last Name</label>
                          <input
                            type="text"
                            className="form-control-dark"
                            value={profileData.lastname}
                            onChange={(e) => setProfileData(prev => ({ ...prev, lastname: e.target.value }))}
                            style={{ width: '100%' }}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label-dark">Email Address</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="input-group-text-dark" style={{ padding: '0.7rem 1rem' }}>
                            <Mail size={18} />
                          </span>
                          <input
                            type="email"
                            className="form-control-dark"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            style={{ width: '100%', marginLeft: '-1px' }}
                            required
                          />
                        </div>
                      </div>

                      <button
                        onClick={handleProfileUpdate}
                        className="btn-primary-dark"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span style={{ marginRight: '0.5rem' }}>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Save size={18} style={{ marginRight: '0.5rem' }} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'password' && (
                  <div className="tab-pane fade show active p-4" role="tabpanel">
                    <div>
                      <div style={{ marginBottom: '1rem' }}>
                        <label className="form-label-dark">Current Password</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="input-group-text-dark" style={{ padding: '0.7rem 1rem' }}>
                            <Lock size={18} />
                          </span>
                          <input
                            type="password"
                            className="form-control-dark"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            style={{ width: '100%', marginLeft: '-1px' }}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label className="form-label-dark">New Password</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="input-group-text-dark" style={{ padding: '0.7rem 1rem' }}>
                            <Lock size={18} />
                          </span>
                          <input
                            type="password"
                            className="form-control-dark"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            style={{ width: '100%', marginLeft: '-1px' }}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label-dark">Confirm Password</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="input-group-text-dark" style={{ padding: '0.7rem 1rem' }}>
                            <Lock size={18} />
                          </span>
                          <input
                            type="password"
                            className="form-control-dark"
                            value={passwordData.confirmNewPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                            style={{ width: '100%', marginLeft: '-1px' }}
                            required
                          />
                        </div>
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        className="btn-primary-dark"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span style={{ marginRight: '0.5rem' }}>Changing...</span>
                          </>
                        ) : (
                          <>
                            <Lock size={18} style={{ marginRight: '0.5rem' }} />
                            Change Password
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}