import React, { useState } from 'react';
import {
  User, Mail, Lock, CheckCircle, AlertCircle, Edit3,
  Phone, MapPin, Calendar, TrendingUp, Clock,
  Shield, Bell, Globe, Eye, EyeOff,
  Activity, Briefcase, GraduationCap, Building, CreditCard, Smartphone
} from 'lucide-react';

const ProfilePageRedesigned = ({ user = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // User data from props or defaults
  const [profileData, setProfileData] = useState({
    firstName: user.firstname || user.firstName || 'John',
    lastName: user.lastname || user.lastName || 'Doe',
    username: user.username || user.name || `${user.firstname || 'John'} ${user.lastname || 'Doe'}`,
    email: user.email || 'john.doe@student.university.edu',
    phone: user.phone || '+1 (555) 123-4567',
    dateOfBirth: user.dateOfBirth || '1998-05-15',
    studentId: user.studentId || 'STU2024001',
    institution: user.institution || 'University of Technology',
    department: user.department || 'Computer Science',
    year: user.year || 'Third Year',
    gpa: user.gpa || '3.85',
    address: user.address || '123 University Ave, College Town, CT 06511',
    bio: user.bio || 'Computer Science student passionate about software development and artificial intelligence.',
    joinDate: user.createdAt || user.joinDate || '2022-09-01',
    lastLogin: user.lastLogin || new Date().toISOString()
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showNotification('Profile updated successfully!', 'success');
    setIsEditing(false);
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    showNotification('Password changed successfully!', 'success');
    setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setLoading(false);
  };



  const InfoSection = ({ title, children, icon: Icon }) => (
    <div 
      className="info-section mb-4 p-4 rounded-4"
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div className="d-flex align-items-center mb-3">
        {Icon && (
          <div 
            className="d-flex align-items-center justify-content-center me-3"
            style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              borderRadius: '10px'
            }}
          >
            <Icon size={20} color="white" />
          </div>
        )}
        <h5 className="mb-0 fw-bold" style={{ color: '#ffffff' }}>
          {title}
        </h5>
      </div>
      {children}
    </div>
  );

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="row mb-3">
      <div className="col-sm-4">
        <div className="d-flex align-items-center">
          {Icon && <Icon size={16} className="me-2" style={{ color: '#6366f1' }} />}
          <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500' }}>
            {label}
          </span>
        </div>
      </div>
      <div className="col-sm-8">
        <span style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
          {value}
        </span>
      </div>
    </div>
  );

  const tabStyle = (isActive) => ({
    background: isActive 
      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
      : 'rgba(255, 255, 255, 0.05)',
    color: isActive ? '#ffffff' : '#94a3b8',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 20px',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none',
    marginRight: '8px',
    marginBottom: '8px'
  });

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #0f1419 100%)', 
      minHeight: '100vh', 
      padding: '2rem 0', 
      color: '#fff' 
    }}>
      {/* Notification */}
      {notification && (
        <div 
          className="position-fixed"
          style={{
            top: '2rem',
            right: '2rem',
            zIndex: 9999,
            animation: 'slideIn 0.3s ease'
          }}
        >
          <div 
            className="alert d-flex align-items-center p-3 rounded-3"
            style={{
              background: notification.type === 'success' 
                ? 'rgba(34, 197, 94, 0.2)' 
                : 'rgba(239, 68, 68, 0.2)',
              border: `1px solid ${notification.type === 'success' ? '#22c55e' : '#ef4444'}`,
              color: notification.type === 'success' ? '#bbf7d0' : '#fecaca',
              backdropFilter: 'blur(20px)',
              minWidth: '300px'
            }}
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} className="me-2" style={{ color: '#22c55e' }} />
            ) : (
              <AlertCircle size={20} className="me-2" style={{ color: '#ef4444' }} />
            )}
            <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>
              {notification.message}
            </span>
          </div>
        </div>
      )}

      <div className="container-fluid">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="p-4 rounded-4 position-relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="row align-items-center">
                <div className="col">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h1 className="mb-2 fw-bold" style={{
                        fontSize: '2.5rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {profileData.username || `${profileData.firstName} ${profileData.lastName}`}
                      </h1>
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <span className="badge px-3 py-2" style={{
                          background: 'rgba(99, 102, 241, 0.2)',
                          color: '#a5b4fc',
                          borderRadius: '8px',
                          fontSize: '0.85rem'
                        }}>
                          <GraduationCap size={14} className="me-1" />
                          {profileData.year} Student
                        </span>
                        <span className="badge px-3 py-2" style={{
                          background: 'rgba(34, 197, 94, 0.2)',
                          color: '#86efac',
                          borderRadius: '8px',
                          fontSize: '0.85rem'
                        }}>
                          <Building size={14} className="me-1" />
                          {profileData.department}
                        </span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', lineHeight: '1.5' }}>
                        {profileData.bio}
                      </p>
                      <div className="d-flex align-items-center gap-4 mt-3">
                        <div className="d-flex align-items-center">
                          <Mail size={16} className="me-2" style={{ color: '#6366f1' }} />
                          <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                            {profileData.email}
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <Calendar size={16} className="me-2" style={{ color: '#6366f1' }} />
                          <span style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                            Joined {new Date(profileData.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn d-flex align-items-center"
                      onClick={() => setIsEditing(!isEditing)}
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        border: 'none',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      <Edit3 size={18} className="me-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Tab Navigation */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap">
              <button
                onClick={() => setActiveTab('overview')}
                style={tabStyle(activeTab === 'overview')}
              >
                <User size={16} className="me-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                style={tabStyle(activeTab === 'personal')}
              >
                <User size={16} className="me-2" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                style={tabStyle(activeTab === 'academic')}
              >
                <GraduationCap size={16} className="me-2" />
                Academic
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                style={tabStyle(activeTab === 'contact')}
              >
                <MapPin size={16} className="me-2" />
                Contact
              </button>
              <button
                onClick={() => setActiveTab('security')}
                style={tabStyle(activeTab === 'security')}
              >
                <Shield size={16} className="me-2" />
                Security
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="row">
          <div className="col-12">
            {activeTab === 'overview' && (
              <div className="row">
                <div className="col-lg-8">
                  <InfoSection title="Account Information" icon={User}>
                    <div className="row">
                      <div className="col-md-6">
                        <InfoRow label="Full Name" value={`${profileData.firstName} ${profileData.lastName}`} icon={User} />
                        <InfoRow label="Email" value={profileData.email} icon={Mail} />
                        <InfoRow label="Phone" value={profileData.phone} icon={Phone} />
                      </div>
                      <div className="col-md-6">
                        <InfoRow label="Student ID" value={profileData.studentId} icon={CreditCard} />
                        <InfoRow label="Institution" value={profileData.institution} icon={Building} />
                        <InfoRow label="Department" value={profileData.department} icon={Briefcase} />
                      </div>
                    </div>
                  </InfoSection>
                </div>
                <div className="col-lg-4">
                  <InfoSection title="Account Status" icon={Activity}>
                    <InfoRow label="Account Created" value={new Date(profileData.joinDate).toLocaleDateString()} icon={Calendar} />
                    <InfoRow label="Last Login" value={new Date(profileData.lastLogin).toLocaleDateString()} icon={Clock} />
                    <InfoRow label="Current Year" value={profileData.year} icon={GraduationCap} />
                    <div className="mt-3 p-3 rounded-3" style={{
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                      <div className="d-flex align-items-center">
                        <CheckCircle size={20} className="me-2" style={{ color: '#22c55e' }} />
                        <span style={{ color: '#22c55e', fontWeight: '600' }}>Account Active</span>
                      </div>
                    </div>
                  </InfoSection>
                </div>
              </div>
            )}

            {activeTab === 'personal' && (
              <InfoSection title="Personal Information" icon={User}>
                <div className="row">
                  <div className="col-md-6">
                    <InfoRow label="First Name" value={profileData.firstName} icon={User} />
                    <InfoRow label="Last Name" value={profileData.lastName} icon={User} />
                    <InfoRow label="Date of Birth" value={new Date(profileData.dateOfBirth).toLocaleDateString()} icon={Calendar} />
                    <InfoRow label="Phone" value={profileData.phone} icon={Phone} />
                  </div>
                  <div className="col-md-6">
                    <InfoRow label="Email" value={profileData.email} icon={Mail} />
                    <InfoRow label="Student ID" value={profileData.studentId} icon={CreditCard} />
                    <InfoRow label="Institution" value={profileData.institution} icon={Building} />
                    <InfoRow label="Department" value={profileData.department} icon={Briefcase} />
                  </div>
                  <div className="col-12 mt-3">
                    <h6 style={{ color: '#e2e8f0', marginBottom: '10px' }}>Bio</h6>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                      {profileData.bio}
                    </p>
                  </div>
                </div>
              </InfoSection>
            )}

            {activeTab === 'academic' && (
              <InfoSection title="Academic Information" icon={GraduationCap}>
                <div className="row">
                  <div className="col-md-6">
                    <InfoRow label="Student ID" value={profileData.studentId} icon={CreditCard} />
                    <InfoRow label="Institution" value={profileData.institution} icon={Building} />
                    <InfoRow label="Department" value={profileData.department} icon={Briefcase} />
                    <InfoRow label="Current Year" value={profileData.year} icon={Calendar} />
                  </div>
                  <div className="col-md-6">
                    <InfoRow label="GPA" value={`${profileData.gpa}/4.0`} icon={TrendingUp} />
                    <InfoRow label="Date of Birth" value={new Date(profileData.dateOfBirth).toLocaleDateString()} icon={Calendar} />
                    <InfoRow label="Enrollment Date" value={new Date(profileData.joinDate).toLocaleDateString()} icon={Calendar} />
                    <div className="mt-3">
                      <h6 style={{ color: '#e2e8f0', marginBottom: '10px' }}>Academic Progress</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Current GPA</span>
                        <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{profileData.gpa}/4.0</span>
                      </div>
                      <div className="progress" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.1)' }}>
                        <div 
                          className="progress-bar" 
                          style={{ 
                            width: `${(parseFloat(profileData.gpa) / 4.0) * 100}%`,
                            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </InfoSection>
            )}

            {activeTab === 'contact' && (
              <InfoSection title="Contact Information" icon={MapPin}>
                <div className="row">
                  <div className="col-md-6">
                    <InfoRow label="Email" value={profileData.email} icon={Mail} />
                    <InfoRow label="Phone" value={profileData.phone} icon={Phone} />
                    <InfoRow label="Address" value={profileData.address} icon={MapPin} />
                  </div>
                  <div className="col-md-6">
                    <InfoRow label="Institution" value={profileData.institution} icon={Building} />
                    <InfoRow label="Department" value={profileData.department} icon={Briefcase} />
                    <InfoRow label="Student ID" value={profileData.studentId} icon={CreditCard} />
                  </div>
                </div>
              </InfoSection>
            )}

            {activeTab === 'security' && (
              <div className="row">
                <div className="col-lg-6">
                  <InfoSection title="Change Password" icon={Lock}>
                    <form onSubmit={handlePasswordChange}>
                      <div className="mb-3">
                        <label className="form-label" style={{ color: '#e2e8f0', fontWeight: '600' }}>
                          Current Password
                        </label>
                        <div className="position-relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              color: '#ffffff',
                              borderRadius: '8px',
                              paddingRight: '45px'
                            }}
                          />
                          <button
                            type="button"
                            className="btn position-absolute"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              right: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              color: '#94a3b8'
                            }}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label" style={{ color: '#e2e8f0', fontWeight: '600' }}>
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label" style={{ color: '#e2e8f0', fontWeight: '600' }}>
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={passwordData.confirmNewPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn"
                        disabled={loading}
                        style={{
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          border: 'none',
                          color: 'white',
                          borderRadius: '8px',
                          padding: '10px 20px',
                          fontWeight: '600'
                        }}
                      >
                        {loading ? 'Changing...' : 'Change Password'}
                      </button>
                    </form>
                  </InfoSection>
                </div>
                <div className="col-lg-6">
                  <InfoSection title="Security Settings" icon={Shield}>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-3" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div className="d-flex align-items-center">
                        <Smartphone size={20} className="me-3" style={{ color: '#6366f1' }} />
                        <div>
                          <p className="mb-0" style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
                            Two-Factor Authentication
                          </p>
                          <small style={{ color: '#94a3b8' }}>Add an extra layer of security</small>
                        </div>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-3" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div className="d-flex align-items-center">
                        <Bell size={20} className="me-3" style={{ color: '#6366f1' }} />
                        <div>
                          <p className="mb-0" style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
                            Login Notifications
                          </p>
                          <small style={{ color: '#94a3b8' }}>Get notified of new logins</small>
                        </div>
                      </div>
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                      </div>
                    </div>
                  </InfoSection>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
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
        
        .form-control:focus,
        .form-select:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
          border-color: #6366f1 !important;
        }
        
        .form-check-input:checked {
          background-color: #6366f1;
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default ProfilePageRedesigned;