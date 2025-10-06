import { Star, Download, Clock, Users, Eye, Bookmark, FileText, CircleArrowDown } from 'lucide-react';
import { useState } from 'react';
import { dataService } from '../services/dataService';
import { toast } from 'react-toastify';

const BundleCard = ({ bundle, onSelect, onPreview, onBookmark, isBookmarked }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e) => {
    e.stopPropagation();
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div
      className="h-100 p-4 position-relative"
      onClick={() => onSelect(bundle)}
      style={{
        background: 'white',
        border: '1px solid rgba(26, 54, 93, 0.1)',
        borderRadius: '1rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      }}
    >
      {/* Bookmark Button */}
      <button
        className="position-absolute top-0 end-0 m-3 btn btn-sm rounded-circle"
        onClick={(e) => {
          e.stopPropagation();
          onBookmark(bundle);
        }}
        style={{
          zIndex: 2,
          background: isBookmarked ? '#FFD700' : 'rgba(26, 54, 93, 0.1)',
          border: 'none',
          color: isBookmarked ? '#1a365d' : '#4a5568'
        }}
      >
        <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* Bundle Header */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-bold mb-0 flex-grow-1 me-2" style={{ color: '#1a365d' }}>
            {bundle.title || bundle.name}
          </h5>
          {bundle.price === 0 ? (
            <span
              className="badge px-2 py-1 rounded-pill"
              style={{ background: '#FFD700', color: '#1a365d', fontWeight: '600' }}
            >
              Free
            </span>
          ) : (
            <span
              className="badge px-2 py-1 rounded-pill"
              style={{ background: 'linear-gradient(135deg, #1a365d, #2d3748)', color: 'white', fontWeight: '600' }}
            >
              Premium
            </span>
          )}
        </div>

        <small className="d-block mb-2" style={{ color: '#4a5568' }}>
          {bundle.departmentName || 'General Studies'}
        </small>

        {/* Price and Rating */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            {bundle.price === 0 ? (
              <span className="h5 fw-bold mb-0" style={{ color: '#FFD700' }}>Free</span>
            ) : (
              <div className="d-flex align-items-center">
                <span className="h5 fw-bold mb-0" style={{ color: '#1a365d' }}>₹{bundle.price}</span>
                <small className="text-decoration-line-through ms-2" style={{ color: '#a0aec0' }}>
                  ₹{Math.round(bundle.price * 1.4)}
                </small>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center">
            <div className="d-flex me-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  style={{ color: i < Math.floor(bundle.rating || 4.5) ? '#FFD700' : '#cbd5e0' }}
                  fill={i < Math.floor(bundle.rating || 4.5) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <small style={{ color: '#4a5568' }}>({bundle.rating || '4.5'})</small>
          </div>
        </div>
      </div>

      {/* Bundle Stats */}
      <div className="row g-2 mb-3">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <FileText size={14} style={{ color: '#FFD700' }} className="me-2" />
            <small style={{ color: '#4a5568' }}>{bundle.productCount || bundle.products?.length || 0} Materials</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Download size={14} style={{ color: '#FFD700' }} className="me-2" />
            <small style={{ color: '#4a5568' }}>{Math.floor(Math.random() * 500) + 100} Downloads</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Users size={14} style={{ color: '#FFD700' }} className="me-2" />
            <small style={{ color: '#4a5568' }}>{Math.floor(Math.random() * 200) + 50} Students</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Clock size={14} style={{ color: '#FFD700' }} className="me-2" />
            <small style={{ color: '#4a5568' }}>Lifetime Access</small>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="small mb-4 flex-grow-1" style={{ color: '#4a5568' }}>
        {bundle.description || "Comprehensive study materials with practice questions, detailed solutions, and expert guidance to help you excel in your exams."}
      </p>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-auto">
        <button
          className="btn btn-sm flex-fill"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(bundle);
          }}
          style={{
            border: '1px solid rgba(26, 54, 93, 0.2)',
            color: '#1a365d',
            background: 'transparent',
            fontWeight: '500'
          }}
        >
          <Eye size={14} className="me-1" />
          Preview
        </button>

        {bundle.price === 0 ? (
          <button
            className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center ${
              isDownloading ? 'disabled' : ''
            }`}
            onClick={handleDownload}
            disabled={isDownloading}
            style={{
              background: '#FFD700',
              border: 'none',
              color: '#1a365d',
              fontWeight: '600'
            }}
          >
            {isDownloading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Downloading...
              </>
            ) : (
              <>
                <CircleArrowDown size={14} className="me-1" />
                Download
              </>
            )}
          </button>
        ) : (
          <button
            className="btn btn-sm flex-fill"
            onClick={async (e) => {
              e.stopPropagation();
              const confirmed = window.confirm('Are you sure you want to purchase this bundle?');
              if (confirmed) {
                try {
                  await dataService.confirmPayment(bundle._id || bundle.id);
                  toast.success('Payment successful! Bundle purchased.');
                } catch (error) {
                  toast.error('Payment failed. Please try again.');
                }
              }
            }}
            style={{
              background: 'linear-gradient(135deg, #1a365d, #2d3748)',
              border: 'none',
              color: 'white',
              fontWeight: '600'
            }}
          >
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
};

const BundleGrid = ({
  bundles,
  loading,
  onBundleSelect,
  onBundlePreview,
  bookmarkedBundles = [],
  onBookmarkToggle
}) => {
  if (loading) {
    return (
      <div className="container py-5" style={{ background: 'white' }}>
        <div className="row g-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className={`col-lg-4 col-md-6 ${index === 0 ? 'col-lg-6' : ''}`}>
              <div
                className="h-100 p-4"
                style={{
                  background: 'white',
                  border: '1px solid rgba(26, 54, 93, 0.1)',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="placeholder-glow">
                  <div className="placeholder col-8 mb-2" style={{ backgroundColor: 'rgba(26, 54, 93, 0.1)' }}></div>
                  <div className="placeholder col-6 mb-3" style={{ backgroundColor: 'rgba(26, 54, 93, 0.1)' }}></div>
                  <div className="placeholder col-12 mb-3" style={{ height: '60px', backgroundColor: 'rgba(26, 54, 93, 0.1)' }}></div>
                  <div className="d-flex gap-2">
                    <div className="placeholder col-6" style={{ height: '32px', backgroundColor: 'rgba(26, 54, 93, 0.1)' }}></div>
                    <div className="placeholder col-6" style={{ height: '32px', backgroundColor: 'rgba(26, 54, 93, 0.1)' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!bundles || bundles.length === 0) {
    return (
      <div className="container py-5" style={{ background: 'white' }}>
        <div className="text-center">
          <FileText size={64} style={{ color: '#cbd5e0' }} className="mb-3" />
          <h4 style={{ color: '#4a5568' }} className="mb-2">No Study Materials Found</h4>
          <p style={{ color: '#a0aec0' }}>
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', paddingLeft: '0', paddingRight: '0' }}>
      <div className="container py-5" style={{ background: 'white', paddingLeft: '0', paddingRight: '0' }}>
        <div className="row g-4" style={{ marginLeft: '0', marginRight: '0' }}>
          {bundles.map((bundle, index) => (
            <div
              key={bundle.id || bundle._id}
              className={`col-lg-4 col-md-6 ${index === 0 ? 'col-lg-6' : ''}`}
            >
              <BundleCard
                bundle={bundle}
                onSelect={onBundleSelect}
                onPreview={onBundlePreview}
                onBookmark={onBookmarkToggle}
                isBookmarked={bookmarkedBundles.includes(bundle.id || bundle._id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {bundles.length > 0 && bundles.length % 6 === 0 && (
        <div className="text-center mt-5">
          <button
            className="btn btn-lg"
            style={{
              background: 'rgba(26, 54, 93, 0.1)',
              border: '1px solid rgba(26, 54, 93, 0.2)',
              color: '#1a365d',
              fontWeight: '600',
              padding: '0.875rem 2rem',
              borderRadius: '0.75rem'
            }}
          >
            Load More Materials
          </button>
        </div>
      )}
    </div>
  );
};

export default BundleGrid;
