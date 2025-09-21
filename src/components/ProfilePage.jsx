import { useState } from 'react';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Save, Camera } from 'lucide-react';
import { authService } from '../services/authService';

const ProfilePage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    firstname: user?.firstname || '',
    lastname: user?.lastname || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call for profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.changePassword(passwordData);
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                    type="button"
                  >
                    <User size={16} className="me-2" />
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'password' ? 'active' : ''}`}
                    onClick={() => setActiveTab('password')}
                    type="button"
                  >
                    <Lock size={16} className="me-2" />
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="card-body">
              {activeTab === 'profile' && (
                <div className="tab-pane fade show active">
                  <div className="row mb-4">
                    <div className="col-12 text-center">
                      <div className="position-relative d-inline-block">
                        <img
                          src={user?.profileImage || 'https://i.pravatar.cc/150?img=1'}
                          alt="Profile"
                          className="rounded-circle"
                          width="120"
                          height="120"
                        />
                        <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                          <Camera size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstname"
                          value={profileData.firstname}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            firstname: e.target.value
                          }))}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastname"
                          value={profileData.lastname}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            lastname: e.target.value
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Mail size={18} />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            email: e.target.value
                          }))}
                        />
                      </div>
                    </div>
                    
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="me-2" />
                            Update Profile
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'password' && (
                <div className="tab-pane fade show active">
                  <form onSubmit={handlePasswordChange}>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={18} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            currentPassword: e.target.value
                          }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={18} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            newPassword: e.target.value
                          }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={18} />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmNewPassword"
                          value={passwordData.confirmNewPassword}
                          onChange={(e) => setPasswordData(prev => ({
                            ...prev,
                            confirmNewPassword: e.target.value
                          }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-warning"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Changing...
                          </>
                        ) : (
                          <>
                            <Lock size={16} className="me-2" />
                            Change Password
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;