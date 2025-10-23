import React from 'react';
import { Lock, Users, Mail, Phone } from 'lucide-react';

const NoAccess = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
      color: '#ffffff'
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="text-center p-5 rounded-4" style={{
              background: 'rgba(15, 20, 40, 0.8)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.1)'
            }}>
              {/* Icon */}
              <div className="mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                  border: '2px solid rgba(99, 102, 241, 0.2)'
                }}>
                  <Lock size={48} style={{ color: '#6366f1' }} />
                </div>
              </div>

              {/* Title */}
              <h1 className="display-5 fw-bold mb-3" style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Access Required
              </h1>

              {/* Description */}
              <p className="lead mb-4" style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                This platform provides study materials through institutional access only. 
                Contact your administrator to request access to the materials you need.
              </p>

              {/* Features */}
              <div className="row g-4 mb-5">
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3 rounded-3" style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.1)'
                  }}>
                    <Users size={24} className="me-3" style={{ color: '#6366f1' }} />
                    <div className="text-start">
                      <div className="fw-semibold" style={{ color: '#ffffff' }}>Institutional Content</div>
                      <small style={{ color: '#cbd5e1' }}>Managed by administrators</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-center p-3 rounded-3" style={{
                    background: 'rgba(99, 102, 241, 0.05)',
                    border: '1px solid rgba(99, 102, 241, 0.1)'
                  }}>
                    <Lock size={24} className="me-3" style={{ color: '#6366f1' }} />
                    <div className="text-start">
                      <div className="fw-semibold" style={{ color: '#ffffff' }}>Secure Access</div>
                      <small style={{ color: '#cbd5e1' }}>Controlled distribution</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-4 rounded-3 mb-4" style={{
                background: 'rgba(0, 255, 127, 0.05)',
                border: '1px solid rgba(0, 255, 127, 0.1)'
              }}>
                <h6 className="fw-bold mb-3" style={{ color: '#00ff7f' }}>Need Access?</h6>
                <p className="mb-3" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                  Contact your institution's administrator or support team to request access to study materials.
                </p>
                <div className="d-flex justify-content-center gap-4">
                  <div className="d-flex align-items-center">
                    <Mail size={16} className="me-2" style={{ color: '#00ff7f' }} />
                    <small style={{ color: '#cbd5e1' }}>admin@institution.edu</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <Phone size={16} className="me-2" style={{ color: '#00ff7f' }} />
                    <small style={{ color: '#cbd5e1' }}>+1 (555) 123-4567</small>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <p className="small mb-0" style={{ color: '#6c757d' }}>
                Once access is granted, you'll be able to download and view all available study materials 
                for your courses and subjects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoAccess;