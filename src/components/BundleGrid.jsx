import { useState, useEffect, useCallback, memo } from 'react';
import {
  Download,
  Users,
  Eye,
  Bookmark,
  FileText,
  CircleArrowDown,
  Star,
  Zap,
  Shield,
  Target,
  UserPlus
} from 'lucide-react';

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

// Constants
const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
];

const ICONS = [Zap, Shield, Target, Star, FileText, Users];

// Simplified BundleCard Component
const BundleCard = memo(({ bundle, onSelect, onPreview, onBookmark, isBookmarked, onViewAccess, onRequestAccess, index, userAccess }) => {
  const [isRequestingAccess, setIsRequestingAccess] = useState(false);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSelect(bundle);
    if (e.key === ' ') {
      e.preventDefault();
      onPreview(bundle);
    }
  };

  const handleRequestAccess = async (e) => {
    e.stopPropagation();
    setIsRequestingAccess(true);
    try {
      await onRequestAccess(bundle);
    } finally {
      setIsRequestingAccess(false);
    }
  };

  const IconComponent = ICONS[index % ICONS.length];
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const isPopular = index === 0;
  const isFree = bundle.price === 0;
  
  // Check user access for this bundle
  const bundleId = bundle.id || bundle._id;
  const access = userAccess?.[bundleId];
  const hasAccess = access?.hasAccess || false;
  const isExpired = access?.expiryDate && new Date(access.expiryDate) < new Date();

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={() => onSelect(bundle)}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${bundle.title || bundle.name} details`}
      className="bundle-card position-relative overflow-hidden d-flex align-items-center"
      style={{
        background: 'rgba(15, 20, 40, 0.8)',
        color: '#ffffff',
        border: isPopular ? '2px solid #6366f1' : '1px solid rgba(99, 102, 241, 0.15)',
        borderRadius: '16px',
        cursor: 'pointer',
        outline: 'none',
        backdropFilter: 'blur(20px)',
        minHeight: '220px',
        padding: '2rem'
      }}
    >
      {/* Icon Section */}
      <div
        className="icon-section d-flex align-items-center justify-content-center position-relative overflow-hidden me-4"
        style={{
          background: gradient,
          borderRadius: '1rem',
          minWidth: '120px',
          height: '120px',
          padding: '2rem'
        }}
      >
        <div className="icon-bg-shape-1"></div>
        <div className="icon-bg-shape-2"></div>
        <IconComponent size={40} color="white" strokeWidth={1.5} style={{ position: 'relative', zIndex: 1 }} />
      </div>

      {/* Badge */}
      <div className="position-absolute" style={{ top: 15, left: 15, zIndex: 3 }}>
        <span
          className="badge fw-bold"
          style={{
            background: hasAccess && !isExpired ? '#00ff7f' : isExpired ? '#ff6b6b' : '#6c757d',
            color: hasAccess && !isExpired ? '#0b0c10' : '#ffffff',
            padding: '0.4rem 0.8rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
          }}
        >
          {hasAccess && !isExpired ? 'Access Granted' : isExpired ? 'Access Expired' : 'No Access'}
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row align-items-center">
          {/* Left Content Column */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h4 className="fw-bold mb-0" style={{ 
                color: 'white', 
                fontSize: '1.35rem',
                lineHeight: '1.3',
                letterSpacing: '-0.01em'
              }}>
                {bundle.title || bundle.name}
              </h4>
            </div>

            <div className="mb-3" style={{ 
              color: '#e2e8f0', 
              fontSize: '1rem',
              fontWeight: '500',
              opacity: '0.8'
            }}>
              {bundle.departmentName || 'General Studies'}
            </div>

            {/* Rating */}
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex me-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < 4 ? 'text-success' : 'text-white-50'}`}
                    fill={i < 4 ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <small className="text-white-50">
                4.{Math.floor(Math.random() * 9) + 1} ({Math.floor(Math.random() * 500) + 100} reviews)
              </small>
            </div>

            {/* Description */}
            <p className="mb-4" style={{ 
              color: '#cbd5e1', 
              fontSize: '1rem', 
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              {bundle.description ||
                'Comprehensive study materials with practice questions, detailed solutions, and expert guidance to help you excel in your exams.'}
            </p>

            {/* Stats */}
            <div className="d-flex gap-4 mb-3" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              <div className="d-flex align-items-center">
                <FileText size={14} className="me-2" style={{ color: '#6366f1' }} />
                {bundle.productCount || bundle.products?.length || Math.floor(Math.random() * 50) + 10} Materials
              </div>
              <div className="d-flex align-items-center">
                <Users size={14} className="me-2" style={{ color: '#6366f1' }} />
                {Math.floor(Math.random() * 300) + 50} Students
              </div>
              <div className="d-flex align-items-center">
                <Download size={14} className="me-2" style={{ color: '#6366f1' }} />
                {Math.floor(Math.random() * 2000) + 100} Downloads
              </div>
            </div>
          </div>

          {/* Right Content Column - Price & Actions */}
          <div className="col-md-4 text-md-end">
            {/* Access Status Section */}
            <div className="d-flex align-items-center justify-content-md-end mb-3">
              <div className="h5 fw-bold mb-0" style={{ 
                color: hasAccess && !isExpired ? '#00ff7f' : isExpired ? '#ff6b6b' : '#6c757d' 
              }}>
                {hasAccess && !isExpired ? 'Access Granted' : isExpired ? 'Access Expired' : 'Institutional Content'}
              </div>
            </div>
            
            {access?.expiryDate && (
              <div className="text-end mb-3">
                <small style={{ color: '#cbd5e1' }}>
                  {isExpired ? 'Expired on' : 'Valid until'} {new Date(access.expiryDate).toLocaleDateString()}
                </small>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-3">
                <button
                  className="btn bundle-btn flex-fill"
                  onClick={hasAccess && !isExpired ? (e) => {
                    e.stopPropagation();
                    onPreview(bundle);
                  } : handleRequestAccess}
                  disabled={isRequestingAccess}
                  style={{ 
                    fontSize: '0.95rem', 
                    padding: '0.75rem 1.25rem',
                    background: hasAccess && !isExpired 
                      ? 'rgba(99, 102, 241, 0.05)' 
                      : isRequestingAccess 
                        ? 'rgba(255, 193, 7, 0.3)'
                        : 'rgba(255, 193, 7, 0.1)',
                    border: `1px solid ${hasAccess && !isExpired ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 193, 7, 0.3)'}`,
                    color: hasAccess && !isExpired ? '#6366f1' : '#ffc107',
                    fontWeight: '600',
                    borderRadius: '10px',
                    backdropFilter: 'blur(10px)',
                    opacity: isRequestingAccess ? 0.7 : 1
                  }}
                >
                  {hasAccess && !isExpired ? (
                    <>
                      <Eye size={16} className="me-2" />
                      Preview
                    </>
                  ) : isRequestingAccess ? (
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

                <button
                  className="btn bundle-btn flex-fill"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(bundle);
                  }}
                  style={{ 
                    fontSize: '0.95rem', 
                    padding: '0.75rem 1.25rem',
                    background: hasAccess && !isExpired 
                      ? 'linear-gradient(135deg, #00ff7f 0%, #00d4aa 100%)' 
                      : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    border: `1px solid ${hasAccess && !isExpired ? 'rgba(0, 255, 127, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                    color: hasAccess && !isExpired ? '#0b0c10' : '#ffffff',
                    fontWeight: '600',
                    borderRadius: '10px',
                    boxShadow: hasAccess && !isExpired ? '0 4px 16px rgba(0, 255, 127, 0.2)' : '0 4px 16px rgba(99, 102, 241, 0.2)'
                  }}
                >
                  <CircleArrowDown size={16} className="me-2" />
                  {hasAccess && !isExpired ? 'Access Materials' : 'View Bundle'}
                </button>
              </div>

              <button
                className="btn bundle-btn w-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(bundle);
                }}
                style={{ 
                  fontSize: '0.9rem', 
                  padding: '0.6rem 1rem',
                  background: isBookmarked ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${isBookmarked ? 'rgba(99, 102, 241, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
                  color: isBookmarked ? '#6366f1' : '#cbd5e1',
                  fontWeight: '500',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Bookmark size={14} className="me-2" fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});



// -------------------------------
// 🔹 BundleGrid Component
// -------------------------------
const BundleGrid = ({
  bundles,
  loading,
  onBundleSelect,
  onBundlePreview,
  onViewAccess,
  onRequestAccess,
  bookmarkedBundles = [],
  onBookmarkToggle,
  userAccess = {}
}) => {
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

  const styles = `
    .bundle-card {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(99, 102, 241, 0.15);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    
    .bundle-card:hover {
      transform: translateY(-4px) scale(1.005);
      box-shadow: 0 24px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
      border-color: rgba(99, 102, 241, 0.25);
    }
    
    .icon-bg-shape-1 {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      z-index: 0;
    }
    
    .icon-bg-shape-2 {
      position: absolute;
      bottom: -20px;
      left: -20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      z-index: 0;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-16px); }
    }

    .floating-bg {
      animation: float 6s ease-in-out infinite;
    }
    
    .bundle-btn {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-weight: 600;
      letter-spacing: 0.025em;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }
    
    .bundle-btn:hover {
      transform: translateY(-1px);
    }
    
    .bundle-btn:active {
      transform: translateY(0);
      transition: transform 0.1s ease;
    }
  `;

  if (loading) return <LoadingSkeleton />;
  if (!bundles?.length) return <EmptyState />;

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
      color: '#ffffff'
    }}>
      <style>{styles}</style>

      {/* Simplified Background Elements */}
      <div
        className="floating-bg"
        style={{
          position: 'fixed',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(40px)'
        }}
      />

      <div
        className="floating-bg"
        style={{
          position: 'fixed',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(50px)',
          animationDelay: '3s'
        }}
      />

      {/* Cursor Glow Effect */}
      <div
        style={{
          position: 'fixed',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        <div className="container-fluid">
          <div className="row g-4">
            {bundles.map((bundle, index) => (
              <div key={bundle.id || bundle._id} className="col-12">
                <BundleCard
                  bundle={bundle}
                  index={index}
                  onSelect={onBundleSelect}
                  onPreview={onBundlePreview}
                  onBookmark={onBookmarkToggle}
                  isBookmarked={bookmarkedBundles.includes(bundle.id || bundle._id)}
                  onViewAccess={onViewAccess}
                  onRequestAccess={onRequestAccess}
                  userAccess={userAccess}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------
// 🔹 Loading & Empty States
// -------------------------------
const LoadingSkeleton = () => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
    color: '#fff',
    padding: '2rem'
  }}>
    <div className="container-fluid">
      <div className="row g-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-12">
            <div className="d-flex align-items-center p-4 bg-dark bg-opacity-50 border border-success border-opacity-25 rounded-3" style={{ minHeight: '200px' }}>
              <div className="placeholder bg-success bg-opacity-25 me-4 rounded-3" style={{ width: '120px', height: '120px' }}></div>
              <div className="flex-grow-1">
                <div className="placeholder-glow">
                  <div className="placeholder col-8 mb-2 bg-success bg-opacity-25" style={{ height: '24px' }}></div>
                  <div className="placeholder col-6 mb-3 bg-success bg-opacity-25" style={{ height: '16px' }}></div>
                  <div className="placeholder col-12 mb-3 bg-success bg-opacity-25" style={{ height: '60px' }}></div>
                  <div className="d-flex gap-4 mb-3">
                    <div className="placeholder col-2 bg-success bg-opacity-25" style={{ height: '16px' }}></div>
                    <div className="placeholder col-2 bg-success bg-opacity-25" style={{ height: '16px' }}></div>
                    <div className="placeholder col-2 bg-success bg-opacity-25" style={{ height: '16px' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-end" style={{ minWidth: '200px' }}>
                <div className="placeholder col-8 mb-3 bg-success bg-opacity-25" style={{ height: '32px' }}></div>
                <div className="d-flex gap-2 mb-2">
                  <div className="placeholder flex-fill bg-success bg-opacity-25" style={{ height: '40px' }}></div>
                  <div className="placeholder flex-fill bg-success bg-opacity-25" style={{ height: '40px' }}></div>
                </div>
                <div className="placeholder w-100 bg-success bg-opacity-25" style={{ height: '36px' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="d-flex align-items-center justify-content-center text-center" style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
    color: '#fff'
  }}>
    <div>
      <FileText size={80} className="text-success opacity-50 mb-4" />
      <h3 className="text-success fw-bold mb-3" style={{ fontSize: '2rem' }}>
        No Study Materials Found
      </h3>
      <p className="text-light-emphasis" style={{ fontSize: '1.1rem', maxWidth: '400px' }}>
        Try adjusting your search terms or filters to find the perfect study materials for your needs.
      </p>
    </div>
  </div>
);

export default BundleGrid;
