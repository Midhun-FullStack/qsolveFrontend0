import React, { useState, useEffect } from 'react';
import {
  X, Star, Download, Share2, Bookmark, Play, FileText,
  Clock, Users, CheckCircle, ArrowLeft, CircleArrowDown, Lock,
  Shield, Award, Zap, Target, UserPlus, Eye, BookOpen,
  Calendar, TrendingUp, Heart, MessageCircle, ThumbsUp,
  ChevronDown, ChevronRight, Info, AlertCircle, Sparkles
} from 'lucide-react';

// Enhanced Material Card with better UX
const MaterialCard = ({ material, onDownload, hasAccess, index }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleDownload = async () => {
    if (!hasAccess) return;
    setIsDownloading(true);
    try {
      await onDownload(material);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const getFileTypeIcon = (material) => {
    const fileName = material.subject || material.title || '';
    if (fileName.toLowerCase().includes('pdf')) return FileText;
    if (fileName.toLowerCase().includes('video')) return Play;
    return BookOpen;
  };

  const FileIcon = getFileTypeIcon(material);

  return (
    <div 
      className="material-card mb-4" 
      style={{ 
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '0',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        color: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 25px 50px rgba(99, 102, 241, 0.25)';
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Header Section */}
      <div className="p-4 pb-3">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center flex-grow-1">
            <div 
              className="d-flex align-items-center justify-content-center me-3"
              style={{
                width: '48px',
                height: '48px',
                background: `linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)`,
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
              }}
            >
              <FileIcon size={24} color="white" />
            </div>
            <div className="flex-grow-1">
              <h6 className="mb-1 fw-bold" style={{ color: '#ffffff', fontSize: '1.1rem' }}>
                {material.subject || material.title || `Study Material ${index + 1}`}
              </h6>
              <div className="d-flex align-items-center gap-3">
                <span className="badge px-2 py-1" style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  fontSize: '0.75rem',
                  borderRadius: '6px'
                }}>
                  PDF Document
                </span>
                <small style={{ color: '#94a3b8' }}>
                  <Clock size={12} className="me-1" />
                  Updated recently
                </small>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm d-flex align-items-center"
              onClick={() => setLiked(!liked)}
              style={{
                background: liked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: liked ? '#f87171' : '#94a3b8',
                borderRadius: '8px',
                padding: '8px'
              }}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
            </button>
            
            <button
              className="btn btn-sm"
              onClick={() => setExpanded(!expanded)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#94a3b8',
                borderRadius: '8px',
                padding: '8px'
              }}
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      {expanded && (
        <div className="px-4 pb-3">
          <div 
            className="p-3 rounded-3 mb-3"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <p className="mb-2" style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.6' }}>
              {material.description || 'Comprehensive study material covering key concepts, practice questions, and detailed explanations to help you master the subject effectively.'}
            </p>
            <div className="d-flex align-items-center gap-4 text-sm">
              <div className="d-flex align-items-center">
                <FileText size={14} className="me-2" style={{ color: '#6366f1' }} />
                <small style={{ color: '#94a3b8' }}>25 pages</small>
              </div>
              <div className="d-flex align-items-center">
                <Eye size={14} className="me-2" style={{ color: '#6366f1' }} />
                <small style={{ color: '#94a3b8' }}>1.2k views</small>
              </div>
              <div className="d-flex align-items-center">
                <ThumbsUp size={14} className="me-2" style={{ color: '#6366f1' }} />
                <small style={{ color: '#94a3b8' }}>95% helpful</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with Download Button */}
      <div 
        className="p-4 pt-0"
        style={{
          borderTop: expanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <button
          className="btn w-100 d-flex align-items-center justify-content-center"
          onClick={handleDownload}
          disabled={isDownloading || !hasAccess}
          style={{
            background: hasAccess 
              ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
              : 'rgba(108, 117, 125, 0.3)',
            border: 'none',
            color: hasAccess ? '#ffffff' : '#6c757d',
            borderRadius: '12px',
            padding: '12px 16px',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
            boxShadow: hasAccess ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
          }}
        >
          {isDownloading ? (
            <>
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Downloading...
            </>
          ) : hasAccess ? (
            <>
              <CircleArrowDown size={18} className="me-2" />
              Download Material
            </>
          ) : (
            <>
              <Lock size={18} className="me-2" />
              Access Required
            </>
          )}
        </button>
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
  userAccess = null,
  onRequestAccess = () => {}
}) => {
  const [activeTab, setActiveTab] = useState('materials');
  const [isRequestingAccess, setIsRequestingAccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
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

  if (!isOpen) return null;

  const tabStyle = (isActive) => ({
    background: isActive 
      ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
      : 'rgba(255, 255, 255, 0.05)',
    color: isActive ? '#ffffff' : '#94a3b8',
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    boxShadow: isActive ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
  });

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex"
      style={{
        zIndex: 1055,
        background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #0f1419 100%)',
        backdropFilter: 'blur(20px)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden', zIndex: -1 }}>
        <div 
          className="position-absolute"
          style={{
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'float 8s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="w-100 d-flex flex-column">
        {/* Enhanced Header */}
        <div 
          className="d-flex align-items-center justify-content-between p-4"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="d-flex align-items-center">
            <button
              className="btn me-4 d-flex align-items-center justify-content-center"
              onClick={onClose}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '12px',
                color: '#ffffff',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <ArrowLeft size={20} />
            </button>
            
            <div>
              <h2 className="mb-1 fw-bold" style={{
                color: '#ffffff',
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {bundle.title || bundle.name}
              </h2>
              <div className="d-flex align-items-center gap-3">
                <span className="badge px-3 py-1" style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  borderRadius: '8px',
                  fontSize: '0.8rem'
                }}>
                  {bundle.departmentName}
                </span>
                <div className="d-flex align-items-center">
                  <Star size={16} className="me-1" style={{ color: '#fbbf24' }} fill="currentColor" />
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {bundle.rating || '4.5'} ({Math.floor(Math.random() * 500) + 100} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn d-flex align-items-center justify-content-center"
              onClick={() => setShowShareModal(true)}
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '12px',
                color: '#94a3b8',
                transition: 'all 0.3s ease'
              }}
            >
              <Share2 size={20} />
            </button>
            
            <button
              className="btn d-flex align-items-center justify-content-center"
              onClick={() => onBookmarkToggle(bundle)}
              style={{
                width: '48px',
                height: '48px',
                background: isBookmarked ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '12px',
                color: isBookmarked ? '#6366f1' : '#94a3b8',
                transition: 'all 0.3s ease'
              }}
            >
              <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow-1 d-flex" style={{ height: 'calc(100vh - 100px)' }}>
          {/* Main Content */}
          <div className="flex-grow-1 p-4" style={{ overflowY: 'auto' }}>
            {/* Bundle Overview Card */}
            <div 
              className="mb-4 p-4 rounded-4"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="mb-4" style={{ 
                    color: '#e2e8f0', 
                    fontSize: '1.1rem', 
                    lineHeight: '1.6' 
                  }}>
                    {bundle.description || "Comprehensive study materials designed to help you excel in your academic journey with expert-crafted content and detailed explanations."}
                  </p>
                  
                  {/* Stats Row */}
                  <div className="row g-3">
                    <div className="col-auto">
                      <div className="d-flex align-items-center p-3 rounded-3" style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                      }}>
                        <FileText size={20} className="me-3" style={{ color: '#6366f1' }} />
                        <div>
                          <div className="fw-bold" style={{ color: '#ffffff' }}>
                            {(materials.length || subjects.length) + (bundle.files ? bundle.files.length : 0)}
                          </div>
                          <small style={{ color: '#94a3b8' }}>Materials</small>
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
                          <div className="fw-bold" style={{ color: '#ffffff' }}>
                            {Math.floor(Math.random() * 500) + 100}
                          </div>
                          <small style={{ color: '#94a3b8' }}>Students</small>
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
                          <div className="fw-bold" style={{ color: '#ffffff' }}>
                            {Math.floor(Math.random() * 1000) + 500}
                          </div>
                          <small style={{ color: '#94a3b8' }}>Downloads</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-center">
                  <div className="p-4">
                    <div className="mb-3">
                      <Sparkles size={48} style={{ color: '#6366f1' }} />
                    </div>
                    <h5 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                      Premium Content
                    </h5>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                      Expertly curated materials for academic excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tab Navigation */}
            <div className="d-flex justify-content-center mb-4">
              <div 
                className="d-flex p-2 rounded-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <button
                  className="btn me-2"
                  onClick={() => setActiveTab('materials')}
                  style={tabStyle(activeTab === 'materials')}
                >
                  <FileText size={18} className="me-2" />
                  Study Materials
                </button>
                <button
                  className="btn me-2"
                  onClick={() => setActiveTab('overview')}
                  style={tabStyle(activeTab === 'overview')}
                >
                  <Info size={18} className="me-2" />
                  Overview
                </button>
                <button
                  className="btn"
                  onClick={() => setActiveTab('reviews')}
                  style={tabStyle(activeTab === 'reviews')}
                >
                  <MessageCircle size={18} className="me-2" />
                  Reviews
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'materials' && (
                <div>
                  {/* Access Notice for users without access */}
                  {(!hasAccess || isExpired) && (
                    <div 
                      className="alert p-4 mb-4 rounded-4"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255, 193, 7, 0.1) 0%, rgba(255, 193, 7, 0.05) 100%)',
                        border: '1px solid rgba(255, 193, 7, 0.2)',
                        color: '#ffffff'
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <AlertCircle size={24} className="me-3 mt-1" style={{ color: '#fbbf24', flexShrink: 0 }} />
                        <div className="flex-grow-1">
                          <h6 className="mb-2 fw-bold" style={{ color: '#ffffff' }}>
                            {isExpired ? 'Access Expired' : 'Access Required'}
                          </h6>
                          <p className="mb-3" style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>
                            {isExpired 
                              ? 'Your access to this bundle has expired. Contact your administrator to renew access and download materials.'
                              : 'This bundle requires institutional access to download materials. Contact your administrator to request access.'
                            }
                          </p>
                          <button
                            className="btn"
                            onClick={handleRequestAccess}
                            disabled={isRequestingAccess}
                            style={{
                              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                              border: 'none',
                              color: '#0f1419',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontWeight: '600',
                              fontSize: '0.9rem'
                            }}
                          >
                            {isRequestingAccess ? (
                              <>
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>
                                Requesting...
                              </>
                            ) : (
                              <>
                                <UserPlus size={16} className="me-2" />
                                Request Access
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Materials List */}
                  {(materials.length > 0 ? materials : subjects).length > 0 ? (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0" style={{ color: '#ffffff' }}>
                          Available Materials ({(materials.length > 0 ? materials : subjects).length})
                        </h5>
                        {hasAccess && !isExpired && (
                          <button
                            className="btn"
                            onClick={() => onDownload(bundle)}
                            style={{
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              border: 'none',
                              color: '#ffffff',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontWeight: '600',
                              fontSize: '0.9rem'
                            }}
                          >
                            <Download size={16} className="me-2" />
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
                          index={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <FileText size={64} className="mb-3" style={{ color: '#6366f1', opacity: 0.5 }} />
                      <h5 className="fw-bold mb-2" style={{ color: '#ffffff' }}>No Materials Available</h5>
                      <p style={{ color: '#94a3b8' }}>Materials will be added soon. Check back later!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="text-center py-5">
                  <Info size={64} className="mb-3" style={{ color: '#6366f1', opacity: 0.5 }} />
                  <h5 className="fw-bold mb-2" style={{ color: '#ffffff' }}>Detailed Overview</h5>
                  <p style={{ color: '#94a3b8' }}>Comprehensive bundle information coming soon.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-5">
                  <MessageCircle size={64} className="mb-3" style={{ color: '#6366f1', opacity: 0.5 }} />
                  <h5 className="fw-bold mb-2" style={{ color: '#ffffff' }}>Student Reviews</h5>
                  <p style={{ color: '#94a3b8' }}>Reviews and feedback will be displayed here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div 
            className="p-4"
            style={{ 
              width: '350px',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            {/* Access Status Card */}
            <div 
              className="mb-4 p-4 rounded-4"
              style={{
                background: hasAccess && !isExpired 
                  ? 'linear-gradient(145deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)'
                  : 'linear-gradient(145deg, rgba(108, 117, 125, 0.1) 0%, rgba(108, 117, 125, 0.05) 100%)',
                border: `1px solid ${hasAccess && !isExpired ? 'rgba(34, 197, 94, 0.2)' : 'rgba(108, 117, 125, 0.2)'}`,
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="text-center mb-3">
                <div 
                  className="d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: '64px',
                    height: '64px',
                    background: hasAccess && !isExpired 
                      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                      : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {hasAccess && !isExpired ? (
                    <CheckCircle size={32} color="white" />
                  ) : (
                    <Lock size={32} color="white" />
                  )}
                </div>
                
                <h6 className="fw-bold mb-2" style={{ color: '#ffffff' }}>
                  {hasAccess && !isExpired ? 'Full Access Granted' : isExpired ? 'Access Expired' : 'Access Required'}
                </h6>
                
                {userAccess?.expiryDate && (
                  <p className="mb-0" style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    {isExpired ? 'Expired on' : 'Valid until'} {new Date(userAccess.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {userAccess?.grantedBy && (
                <div className="text-center mb-3">
                  <small style={{ color: '#94a3b8' }}>
                    Granted by: <span style={{ color: '#e2e8f0' }}>{userAccess.grantedBy}</span>
                  </small>
                </div>
              )}

              {(!hasAccess || isExpired) && (
                <button
                  className="btn w-100"
                  onClick={handleRequestAccess}
                  disabled={isRequestingAccess}
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    border: 'none',
                    color: '#0f1419',
                    borderRadius: '12px',
                    padding: '12px',
                    fontWeight: '600',
                    fontSize: '1rem'
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
              )}
            </div>

            {/* Features List */}
            <div 
              className="p-4 rounded-4"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h6 className="fw-bold mb-3" style={{ color: '#ffffff' }}>What's Included</h6>
              <div className="space-y-3">
                {[
                  'Comprehensive study materials',
                  'Expert-crafted content',
                  'Regular updates',
                  'Mobile-friendly PDFs',
                  'Practice questions',
                  'Detailed explanations'
                ].map((feature, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <CheckCircle size={16} className="me-3" style={{ color: '#22c55e' }} />
                    <small style={{ color: '#e2e8f0' }}>{feature}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .material-card {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default BundleDetailView;