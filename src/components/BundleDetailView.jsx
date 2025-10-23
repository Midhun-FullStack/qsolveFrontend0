import React, { useState, useEffect } from 'react';
import {
  X, Star, Download, Share2, Bookmark, Play, FileText,
  Clock, Users, CheckCircle, ArrowLeft, CircleArrowDown, Lock,
  Shield, Award, Zap, Target, UserPlus
} from 'lucide-react';

const MaterialCard = ({ material, onDownload, hasAccess }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async () => {
    if (!hasAccess) return;
    setIsDownloading(true);
    try {
      await onDownload(material);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  return (
    <div 
      className="mb-3" 
      style={{ 
        background: 'rgba(15, 20, 40, 0.8)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        borderRadius: '1rem',
        padding: '1.5rem',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        color: '#ffffff'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
      }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
          <div className="d-flex align-items-center mb-2">
            <FileText size={18} className="me-2" style={{ color: '#6366f1' }} />
            <h6 className="mb-0 fw-semibold" style={{ color: '#ffffff' }}>{material.subject || material.title}</h6>
            <small className="ms-3" style={{ color: '#cbd5e1' }}>{material.size || ''}</small>
          </div>
          <p 
            className="small mb-2" 
            style={{ 
              maxHeight: expanded ? '200px' : '40px', 
              overflow: 'hidden', 
              transition: 'max-height 0.25s ease',
              color: '#cbd5e1',
              lineHeight: '1.5'
            }}
          >
            {material.description || 'Study material with comprehensive coverage and detailed explanations'}
          </p>
          <div className="d-flex align-items-center text-sm">
            <Clock size={12} className="me-1" style={{ color: '#6366f1' }} />
            <small style={{ color: '#cbd5e1' }}>PDF Document • Updated recently</small>
          </div>
        </div>

        <div className="ms-3 d-flex flex-column align-items-end">
          <button
            className="btn btn-sm mb-2 d-flex align-items-center"
            onClick={handleDownload}
            disabled={isDownloading || !hasAccess}
            style={
              isDownloading 
                ? { 
                    background: 'rgba(99, 102, 241, 0.2)', 
                    color: '#6366f1', 
                    border: 'none',
                    borderRadius: '0.5rem'
                  } 
                : hasAccess 
                ? { 
                    background: '#6366f1', 
                    color: '#ffffff', 
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600'
                  } 
                : { 
                    background: 'transparent', 
                    color: '#6c757d', 
                    border: '1px solid rgba(108,117,125,0.3)',
                    borderRadius: '0.5rem'
                  }
            }
          >
            {isDownloading ? (
              <>
                <div className="spinner-border spinner-border-sm me-1" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="d-none d-sm-inline">Downloading...</span>
              </>
            ) : hasAccess ? (
              <>
                <CircleArrowDown size={14} className="me-1" />
                <span className="d-none d-sm-inline">Download</span>
              </>
            ) : (
              <>
                <Lock size={14} className="me-1" />
                <span className="d-none d-sm-inline">No Access</span>
              </>
            )}
          </button>

          <button
            className="btn btn-sm"
            onClick={() => setExpanded(!expanded)}
            style={{ 
              border: '1px solid rgba(99, 102, 241, 0.3)', 
              color: '#6366f1', 
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '0.5rem',
              transition: '0.3s'
            }}
          >
            {expanded ? 'Hide' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

const BundleDetailView = ({
  bundle = { title: 'Sample Bundle', departmentName: 'Engineering', description: 'Comprehensive study materials', rating: 4.5 },
  materials = [],
  subjects = [],
  isOpen = true,
  onClose = () => {},
  onDownload = () => {},
  isBookmarked = false,
  onBookmarkToggle = () => {},
  userAccess = null, // { hasAccess: boolean, expiryDate: string, grantedBy: string }
  onRequestAccess = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('materials');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRequestingAccess, setIsRequestingAccess] = useState(false);
  
  const hasAccess = userAccess?.hasAccess || false;
  const isExpired = userAccess?.expiryDate && new Date(userAccess.expiryDate) < new Date();

  const handleRequestAccess = async () => {
    setIsRequestingAccess(true);
    try {
      await onRequestAccess(bundle);
    } finally {
      setIsRequestingAccess(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isOpen || !bundle) return null;

  const keyframes = `
    @keyframes floatBlob1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-30px, 50px) scale(0.9); }
    }

    @keyframes floatBlob2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-40px, 30px) scale(0.9); }
      66% { transform: translate(40px, -40px) scale(1.1); }
    }

    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(0, 255, 127, 0.5), 0 0 40px rgba(0, 255, 127, 0.3); }
      50% { text-shadow: 0 0 30px rgba(0, 255, 127, 0.8), 0 0 60px rgba(0, 255, 127, 0.6); }
    }

    @keyframes pulse {
      0%, 100% { r: 6; opacity: 1; }
      50% { r: 12; opacity: 0; }
    }

    @keyframes gridFlow {
      0% { transform: translateY(0); }
      100% { transform: translateY(100px); }
    }

    @keyframes orbitParticle {
      0% { transform: rotate(0deg) translateX(80px) rotate(0deg); opacity: 1; }
      100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); opacity: 1; }
    }

    .blob-1 {
      animation: floatBlob1 8s ease-in-out infinite;
    }

    .blob-2 {
      animation: floatBlob2 10s ease-in-out infinite;
    }

    .title-glow {
      animation: titleGlow 3s ease-in-out infinite;
    }

    .pulse {
      animation: pulse 2s ease-in-out infinite;
    }

    .animated-grid {
      animation: gridFlow 20s linear infinite;
    }

    .orbit-particle {
      animation: orbitParticle 20s linear infinite;
    }
  `;

  const features = [
    'Comprehensive study materials',
    'Expert-crafted content',
    'Regular updates',
    'Lifetime access',
    'Mobile-friendly PDFs',
    '24/7 support access'
  ];

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100" style={{
      zIndex: 1055,
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
      overflow: 'hidden'
    }}>
      <style>{keyframes}</style>

      {/* Animated SVG Background */}
      <svg
        className="animated-bg"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      >
        <defs>
          <radialGradient id="glowGrad1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="glowGrad2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
          </filter>
        </defs>

        {/* Animated Grid */}
        <g className="animated-grid" opacity="0.06" stroke="#6366f1" strokeWidth="1">
          {[...Array(15)].map((_, i) => (
            <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="900" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 100} x2="1400" y2={i * 100} />
          ))}
        </g>

        {/* Floating Gradient Blobs */}
        <g className="blob blob-1" filter="url(#blur)">
          <circle cx="200" cy="200" r="160" fill="url(#glowGrad1)" />
        </g>

        <g className="blob blob-2" filter="url(#blur)">
          <circle cx="1200" cy="700" r="190" fill="url(#glowGrad2)" />
        </g>

        {/* Pulsing Nodes */}
        <g className="node node-1">
          <circle cx="350" cy="200" r="5" fill="#6366f1" opacity="0.8" />
          <circle cx="350" cy="200" r="5" fill="none" stroke="#6366f1" strokeWidth="2" className="pulse" />
        </g>

        <g className="node node-2">
          <circle cx="1050" cy="500" r="5" fill="#8b5cf6" opacity="0.8" />
          <circle cx="1050" cy="500" r="5" fill="none" stroke="#8b5cf6" strokeWidth="2" className="pulse" />
        </g>

        {/* Orbital Particles */}
        <g transform="translate(700, 450)">
          {[...Array(6)].map((_, i) => (
            <g key={`orbit${i}`} className="orbit-particle" style={{ animationDelay: `${i * 3.33}s` }}>
              <circle cx="0" cy="0" r="3" fill="#6366f1" opacity="0.6" />
            </g>
          ))}
        </g>
      </svg>

      {/* Cursor Glow Effect */}
      <div
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Header */}
      <div className="sticky-top" style={{
        background: 'rgba(15, 20, 40, 0.9)',
        color: '#ffffff',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
        boxShadow: '0 6px 24px rgba(99, 102, 241, 0.2)',
        zIndex: 10
      }}>
        <div className="container-fluid">
          <div className="row align-items-center py-4">
            <div className="col-auto">
              <button
                className="btn rounded-circle p-3 shadow-sm"
                onClick={onClose}
                style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: '#6366f1',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'rgba(99, 102, 241, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'rgba(99, 102, 241, 0.1)';
                }}
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="col">
              <h3 className="mb-1 fw-bold title-glow" style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.5rem'
              }}>
                {bundle.title || bundle.name}
              </h3>
              <small style={{ color: '#cbd5e1', fontWeight: 500 }}>{bundle.departmentName}</small>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-3">
                <button
                  className="btn rounded-circle p-3 shadow-sm"
                  onClick={() => onBookmarkToggle(bundle)}
                  style={{
                    background: isBookmarked ? '#6366f1' : 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: isBookmarked ? '#ffffff' : '#6366f1',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="btn rounded-circle p-3 shadow-sm"
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#6366f1',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> 
     <div className="container-fluid" style={{ 
        paddingTop: '2rem', 
        paddingBottom: '2rem', 
        height: 'calc(100vh - 80px)', 
        overflowY: 'auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="pe-lg-4">
              {/* Bundle Hero */}
              <div className="position-relative overflow-hidden rounded-4 mb-4" style={{
                background: 'rgba(15, 20, 40, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)'
              }}>
                <div className="p-5" style={{ color: '#ffffff' }}>
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <div className="mb-4">
                        <span className="badge px-3 py-2 rounded-pill mb-3" style={{
                          background: '#6366f1',
                          color: '#ffffff',
                          fontSize: '0.8rem',
                          fontWeight: '700'
                        }}>
                          {bundle.departmentName}
                        </span>
                        <h1 className="display-5 fw-bold mb-3 title-glow" style={{
                          color: '#ffffff'
                        }}>
                          {bundle.title || bundle.name}
                        </h1>
                        <p className="lead mb-4" style={{ lineHeight: '1.6', color: '#cbd5e1' }}>
                          {bundle.description || "Comprehensive study materials designed to help you excel in your academic journey with expert-crafted content and detailed explanations."}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="row g-4 mb-4">
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                          }}>
                            <Star size={20} className="me-3" style={{ color: '#6366f1' }} fill="currentColor" />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#ffffff' }}>{bundle.rating || '4.5'}</div>
                              <small style={{ color: '#cbd5e1' }}>({Math.floor(Math.random() * 200) + 50} reviews)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                          }}>
                            <Users size={20} className="me-3" style={{ color: '#6366f1' }} />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#ffffff' }}>{Math.floor(Math.random() * 500) + 100}</div>
                              <small style={{ color: '#cbd5e1' }}>Students</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.2)'
                          }}>
                            <Download size={20} className="me-3" style={{ color: '#6366f1' }} />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#ffffff' }}>{Math.floor(Math.random() * 1000) + 500}</div>
                              <small style={{ color: '#cbd5e1' }}>Downloads</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-center">
                      <div className="p-4 rounded-4" style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '2px solid rgba(99, 102, 241, 0.2)',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div className="mb-3">
                          {hasAccess && !isExpired ? (
                            <div className="display-6 fw-bold mb-2" style={{ color: '#00ff7f' }}>Access Granted</div>
                          ) : isExpired ? (
                            <div className="display-6 fw-bold mb-2" style={{ color: '#ff6b6b' }}>Access Expired</div>
                          ) : (
                            <div className="display-6 fw-bold mb-2" style={{ color: '#6c757d' }}>No Access</div>
                          )}
                        </div>
                        
                        {userAccess?.expiryDate && (
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <Clock size={16} className="me-2" style={{ color: '#cbd5e1' }} />
                            <small style={{ color: '#cbd5e1', fontWeight: 500 }}>
                              {isExpired ? 'Expired on' : 'Valid until'} {new Date(userAccess.expiryDate).toLocaleDateString()}
                            </small>
                          </div>
                        )}
                        
                        {userAccess?.grantedBy && (
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <Users size={16} className="me-2" style={{ color: '#cbd5e1' }} />
                            <small style={{ color: '#cbd5e1', fontWeight: 500 }}>
                              Granted by {userAccess.grantedBy}
                            </small>
                          </div>
                        )}
                        
                        <div className="badge px-3 py-2 rounded-pill" style={{
                          background: hasAccess && !isExpired ? '#00ff7f' : '#6c757d',
                          color: hasAccess && !isExpired ? '#0b0c10' : '#ffffff',
                          fontWeight: '700'
                        }}>
                          <CheckCircle size={14} className="me-1" />
                          {hasAccess && !isExpired ? 'Active Access' : 'Institutional Content'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-5">
                <div className="d-flex justify-content-center">
                  <div className="rounded-pill p-2 shadow-sm" style={{
                    background: 'rgba(15, 20, 40, 0.7)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="d-flex">
                      <button
                        className="btn rounded-pill px-4 py-2 me-2"
                        onClick={() => setActiveTab('materials')}
                        style={{
                          background: activeTab === 'materials' ? '#6366f1' : 'transparent',
                          color: activeTab === 'materials' ? '#ffffff' : '#cbd5e1',
                          border: 'none',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          minWidth: '140px'
                        }}
                      >
                        <FileText size={18} className="me-2" />
                        Materials ({(materials.length || subjects.length) + (bundle.files ? bundle.files.length : 0)})
                      </button>
                      <button
                        className="btn rounded-pill px-4 py-2 me-2"
                        onClick={() => setActiveTab('preview')}
                        style={{
                          background: activeTab === 'preview' ? '#00ff7f' : 'transparent',
                          color: activeTab === 'preview' ? '#0b0c10' : '#cbd5e1',
                          border: 'none',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          minWidth: '120px'
                        }}
                      >
                        <Play size={18} className="me-2" />
                        Preview
                      </button>
                      <button
                        className="btn rounded-pill px-4 py-2"
                        onClick={() => setActiveTab('reviews')}
                        style={{
                          background: activeTab === 'reviews' ? '#00ff7f' : 'transparent',
                          color: activeTab === 'reviews' ? '#0b0c10' : '#cbd5e1',
                          border: 'none',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          minWidth: '120px'
                        }}
                      >
                        <Star size={18} className="me-2" />
                        Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>   
           {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'materials' && (
                  <div>
                    <h5 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Study Materials</h5>

                    {(materials.length > 0 ? materials : subjects).length > 0 && (
                      <div className="mb-4">
                        {/* Access Notice for users without access */}
                        {(!hasAccess || isExpired) && (
                          <div className="alert p-4 mb-4 rounded-3" style={{
                            background: 'rgba(108, 117, 125, 0.1)',
                            border: '1px solid rgba(108, 117, 125, 0.2)',
                            color: '#cbd5e1'
                          }}>
                            <div className="d-flex align-items-center mb-2">
                              <Lock size={20} className="me-3" style={{ color: '#6c757d' }} />
                              <h6 className="mb-0" style={{ color: '#ffffff' }}>
                                {isExpired ? 'Access Expired' : 'Access Required'}
                              </h6>
                            </div>
                            <p className="mb-0 small">
                              {isExpired 
                                ? 'Your access to this bundle has expired. Contact your administrator to renew access and download materials.'
                                : 'This bundle requires institutional access to download materials. Contact your administrator to request access.'
                              }
                            </p>
                          </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="mb-0" style={{ color: '#cbd5e1' }}>Question Banks</h6>
                          {hasAccess && !isExpired && (
                            <button
                              className="btn btn-sm"
                              onClick={() => onDownload(bundle)}
                              style={{
                                background: '#00ff7f',
                                border: 'none',
                                color: '#0b0c10',
                                fontWeight: 600,
                                fontSize: '0.8rem'
                              }}
                            >
                              Download All
                            </button>
                          )}
                        </div>

                        {(materials.length > 0 ? materials : subjects).map((material, index) => (
                          <MaterialCard
                            key={material.id || material._id || index}
                            material={material}
                            onDownload={onDownload}
                            hasAccess={hasAccess && !isExpired}
                          />
                        ))}
                      </div>
                    )}

                    {(!materials.length && !subjects.length) && (
                      <div className="text-center py-5" style={{ color: '#cbd5e1' }}>
                        <FileText size={48} className="mb-3" style={{ color: '#00ff7f', opacity: 0.5 }} />
                        <h6>No materials available</h6>
                        <p className="small">Materials will be added soon.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'preview' && (
                  <div className="text-center py-5" style={{ color: '#cbd5e1' }}>
                    <Play size={48} className="mb-3" style={{ color: '#00ff7f', opacity: 0.5 }} />
                    <h6>Preview Coming Soon</h6>
                    <p className="small">Preview functionality will be available soon.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-5" style={{ color: '#cbd5e1' }}>
                    <Star size={48} className="mb-3" style={{ color: '#00ff7f', opacity: 0.5 }} />
                    <h6>Reviews Coming Soon</h6>
                    <p className="small">Student reviews will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '2rem' }}>
              {/* Access Status Card */}
              {!hasAccess || isExpired ? (
                <div className="mb-4 p-4 rounded-4" style={{
                  background: 'rgba(15, 20, 40, 0.7)',
                  border: '2px solid rgba(108, 117, 125, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 40px rgba(108, 117, 125, 0.2)'
                }}>
                  <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>
                    {isExpired ? 'Access Expired' : 'Access Required'}
                  </h6>
                  <p className="mb-3" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    {isExpired 
                      ? 'Your access to this bundle has expired. Contact your administrator to renew access.'
                      : 'This content is available through institutional access only. Contact your administrator to request access.'
                    }
                  </p>
                  <div className="d-flex align-items-center p-3 rounded-3 mb-3" style={{
                    background: 'rgba(108, 117, 125, 0.1)',
                    border: '1px solid rgba(108, 117, 125, 0.2)'
                  }}>
                    <Users size={20} className="me-3" style={{ color: '#6c757d' }} />
                    <div>
                      <div className="fw-semibold" style={{ color: '#ffffff', fontSize: '0.9rem' }}>Institutional Content</div>
                      <small style={{ color: '#cbd5e1' }}>Managed by administrators</small>
                    </div>
                  </div>
                  
                  {/* Request Access Button */}
                  <button
                    className="btn w-100 py-3 fw-bold"
                    onClick={handleRequestAccess}
                    disabled={isRequestingAccess}
                    style={{
                      background: isRequestingAccess 
                        ? 'rgba(255, 193, 7, 0.5)' 
                        : 'linear-gradient(135deg, #ffc107 0%, #ff8c00 100%)',
                      border: 'none',
                      color: '#0b0c10',
                      borderRadius: '0.75rem',
                      fontSize: '1.1rem',
                      boxShadow: isRequestingAccess ? 'none' : '0 4px 16px rgba(255, 193, 7, 0.3)',
                      opacity: isRequestingAccess ? 0.7 : 1
                    }}
                  >
                    {isRequestingAccess ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Requesting Access...
                      </>
                    ) : (
                      <>
                        <UserPlus size={20} className="me-2" />
                        Request Access
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="mb-4 p-4 rounded-4" style={{
                  background: 'rgba(15, 20, 40, 0.7)',
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 20px 40px rgba(0, 255, 127, 0.2)'
                }}>
                  <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>Access Granted</h6>
                  <div className="d-flex align-items-center p-3 rounded-3 mb-3" style={{
                    background: 'rgba(0, 255, 127, 0.1)',
                    border: '1px solid rgba(0, 255, 127, 0.2)'
                  }}>
                    <CheckCircle size={20} className="me-3" style={{ color: '#00ff7f' }} />
                    <div>
                      <div className="fw-semibold" style={{ color: '#ffffff', fontSize: '0.9rem' }}>Full Access</div>
                      <small style={{ color: '#cbd5e1' }}>
                        Valid until {new Date(userAccess.expiryDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                  {userAccess?.grantedBy && (
                    <p className="mb-0" style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                      Granted by: {userAccess.grantedBy}
                    </p>
                  )}
                </div>
              )}

              {/* Features */}
              <div className="p-4 rounded-4" style={{
                background: 'rgba(15, 20, 40, 0.7)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>What's Included</h6>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <CheckCircle size={16} className="me-3" style={{ color: '#00ff7f' }} />
                      <small style={{ color: '#cbd5e1' }}>{feature}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleDetailView;