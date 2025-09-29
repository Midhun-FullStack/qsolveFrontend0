import { Star, Download, Clock, Users, Eye, Bookmark, FileText, CircleArrowDown } from 'lucide-react';
import { useState } from 'react';

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
    <div className="bundle-card-modern h-100 p-4 position-relative" onClick={() => onSelect(bundle)}>
      {/* Bookmark Button */}
      <button
        className={`position-absolute top-0 end-0 m-3 btn btn-sm rounded-circle ${
          isBookmarked ? 'btn-warning' : 'btn-outline-light'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onBookmark(bundle);
        }}
        style={{ zIndex: 2 }}
      >
        <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
      </button>

      {/* Bundle Header */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-bold text-primary mb-0 flex-grow-1 me-2">
            {bundle.title || bundle.name}
          </h5>
          {bundle.price === 0 ? (
            <span className="badge bg-success px-2 py-1 rounded-pill">Free</span>
          ) : (
            <span className="badge bg-primary px-2 py-1 rounded-pill">Premium</span>
          )}
        </div>
        
        <small className="text-muted d-block mb-2">
          {bundle.departmentName || 'General Studies'}
        </small>

        {/* Price and Rating */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            {bundle.price === 0 ? (
              <span className="h5 fw-bold text-success mb-0">Free</span>
            ) : (
              <div className="d-flex align-items-center">
                <span className="h5 fw-bold text-dark mb-0">₹{bundle.price}</span>
                <small className="text-decoration-line-through text-muted ms-2">
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
                  className={`${i < Math.floor(bundle.rating || 4.5) ? 'text-warning' : 'text-muted'}`}
                  fill={i < Math.floor(bundle.rating || 4.5) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <small className="text-muted">({bundle.rating || '4.5'})</small>
          </div>
        </div>
      </div>

      {/* Bundle Stats */}
      <div className="row g-2 mb-3 text-sm">
        <div className="col-6">
          <div className="d-flex align-items-center">
            <FileText size={14} className="text-primary me-2" />
            <small>{bundle.productCount || bundle.products?.length || 0} Materials</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Download size={14} className="text-success me-2" />
            <small>{Math.floor(Math.random() * 500) + 100} Downloads</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Users size={14} className="text-info me-2" />
            <small>{Math.floor(Math.random() * 200) + 50} Students</small>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex align-items-center">
            <Clock size={14} className="text-warning me-2" />
            <small>Lifetime Access</small>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-secondary small mb-4 flex-grow-1">
        {bundle.description || "Comprehensive study materials with practice questions, detailed solutions, and expert guidance to help you excel in your exams."}
      </p>

      {/* Action Buttons */}
      <div className="d-flex gap-2 mt-auto">
        <button
          className="btn btn-outline-primary btn-sm flex-fill"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(bundle);
          }}
        >
          <Eye size={14} className="me-1" />
          Preview
        </button>
        
        {bundle.price === 0 ? (
          <button
            className={`btn btn-success btn-sm flex-fill d-flex align-items-center justify-content-center ${
              isDownloading ? 'disabled' : ''
            }`}
            onClick={handleDownload}
            disabled={isDownloading}
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
            className="btn qsolve-btn-primary btn-sm flex-fill"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(bundle);
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
      <div className="container py-5">
        <div className="row g-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="bundle-card-modern h-100 p-4">
                <div className="placeholder-glow">
                  <div className="placeholder col-8 mb-2"></div>
                  <div className="placeholder col-6 mb-3"></div>
                  <div className="placeholder col-12 mb-3" style={{ height: '60px' }}></div>
                  <div className="d-flex gap-2">
                    <div className="placeholder col-6" style={{ height: '32px' }}></div>
                    <div className="placeholder col-6" style={{ height: '32px' }}></div>
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
      <div className="container py-5">
        <div className="text-center">
          <FileText size={64} className="text-muted mb-3" />
          <h4 className="text-muted mb-2">No Study Materials Found</h4>
          <p className="text-muted">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
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

      {/* Load More Button */}
      {bundles.length > 0 && bundles.length % 6 === 0 && (
        <div className="text-center mt-5">
          <button className="btn qsolve-btn-secondary btn-lg">
            Load More Materials
          </button>
        </div>
      )}
    </div>
  );
};

export default BundleGrid;