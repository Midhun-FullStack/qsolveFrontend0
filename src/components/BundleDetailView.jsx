import { 
  X, Star, Download, Share2, Bookmark, Play, FileText, 
  Clock, Users, CheckCircle, ArrowLeft, CircleArrowDown 
} from 'lucide-react';
import { useState } from 'react';

const MaterialCard = ({ material, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload(material);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  return (
    <div className="glass-card p-3 rounded-3 mb-3">
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center mb-2">
            <FileText size={16} className="text-primary me-2" />
            <h6 className="mb-0 fw-semibold">{material.subject || material.title}</h6>
          </div>
          <p className="text-muted small mb-2">
            {material.description || 'Study material with comprehensive coverage'}
          </p>
          <div className="d-flex align-items-center text-sm">
            <Clock size={12} className="text-muted me-1" />
            <small className="text-muted">PDF Document • Updated recently</small>
          </div>
        </div>
        <button
          className={`btn btn-sm ${isDownloading ? 'btn-secondary' : 'btn-primary'} ms-3`}
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <CircleArrowDown size={14} />
          )}
        </button>
      </div>
    </div>
  );
};

const BundleDetailView = ({ 
  bundle, 
  materials = [], 
  subjects = [], 
  isOpen, 
  onClose, 
  onDownload,
  onPurchase,
  isBookmarked,
  onBookmarkToggle 
}) => {
  const [activeTab, setActiveTab] = useState('materials');

  if (!isOpen || !bundle) return null;

  const features = [
    'Comprehensive study materials',
    'Expert-crafted content',
    'Regular updates',
    'Lifetime access',
    'Mobile-friendly PDFs',
    '24/7 support access'
  ];

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-white" style={{ zIndex: 1055 }}>
      {/* Header */}
      <div className="border-bottom bg-white sticky-top">
        <div className="container-fluid">
          <div className="row align-items-center py-3">
            <div className="col-auto">
              <button 
                className="btn btn-outline-secondary rounded-circle p-2"
                onClick={onClose}
              >
                <ArrowLeft size={20} />
              </button>
            </div>
            <div className="col">
              <h4 className="mb-0 fw-bold text-primary">{bundle.title || bundle.name}</h4>
              <small className="text-muted">{bundle.departmentName}</small>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-2">
                <button 
                  className={`btn btn-sm ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'}`}
                  onClick={() => onBookmarkToggle(bundle)}
                >
                  <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                </button>
                <button className="btn btn-sm btn-outline-primary">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid h-100" style={{ paddingTop: '80px', paddingBottom: '100px' }}>
        <div className="row h-100">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="pe-lg-4">
              {/* Bundle Hero */}
              <div className="glass-card p-4 rounded-3 mb-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h2 className="fw-bold mb-3">{bundle.title || bundle.name}</h2>
                    <p className="text-muted mb-3">
                      {bundle.description || "Comprehensive study materials designed to help you excel in your academic journey with expert-crafted content and detailed explanations."}
                    </p>
                    
                    {/* Stats */}
                    <div className="row g-3 mb-4">
                      <div className="col-auto">
                        <div className="d-flex align-items-center">
                          <Star size={16} className="text-warning me-2" />
                          <span className="fw-semibold">{bundle.rating || '4.5'}</span>
                          <small className="text-muted ms-1">({Math.floor(Math.random() * 200) + 50} reviews)</small>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="d-flex align-items-center">
                          <Users size={16} className="text-info me-2" />
                          <span>{Math.floor(Math.random() * 500) + 100} students</span>
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="d-flex align-items-center">
                          <Download size={16} className="text-success me-2" />
                          <span>{Math.floor(Math.random() * 1000) + 500} downloads</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="glass-card p-3 rounded-3">
                      <div className="h2 fw-bold text-primary mb-2">
                        {bundle.price === 0 ? 'Free' : `₹${bundle.price}`}
                      </div>
                      {bundle.price > 0 && (
                        <small className="text-decoration-line-through text-muted d-block mb-2">
                          ₹{Math.round(bundle.price * 1.4)}
                        </small>
                      )}
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <Clock size={14} className="text-muted me-1" />
                        <small className="text-muted">Lifetime Access</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-4">
                <ul className="nav nav-pills nav-fill glass-card rounded-3 p-2">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'materials' ? 'active' : ''}`}
                      onClick={() => setActiveTab('materials')}
                    >
                      <FileText size={16} className="me-2" />
                      Materials ({materials.length || subjects.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'preview' ? 'active' : ''}`}
                      onClick={() => setActiveTab('preview')}
                    >
                      <Play size={16} className="me-2" />
                      Preview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                      onClick={() => setActiveTab('reviews')}
                    >
                      <Star size={16} className="me-2" />
                      Reviews
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'materials' && (
                  <div>
                    <h5 className="fw-bold mb-3">Study Materials</h5>
                    {(materials.length > 0 ? materials : subjects).map((item, index) => (
                      <MaterialCard
                        key={item._id || index}
                        material={item}
                        onDownload={onDownload}
                      />
                    ))}
                    {materials.length === 0 && subjects.length === 0 && (
                      <div className="text-center py-5">
                        <FileText size={48} className="text-muted mb-3" />
                        <h6 className="text-muted">No materials available</h6>
                        <p className="text-muted small">Materials will be added soon.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'preview' && (
                  <div className="glass-card p-4 rounded-3">
                    <h5 className="fw-bold mb-3">Bundle Preview</h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <h6 className="fw-semibold text-primary">What's Included:</h6>
                        <ul className="list-unstyled">
                          {features.map((feature, index) => (
                            <li key={index} className="d-flex align-items-center mb-2">
                              <CheckCircle size={16} className="text-success me-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6 className="fw-semibold text-primary">Bundle Stats:</h6>
                        <div className="row g-2">
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <div className="fw-bold">{materials.length || subjects.length}</div>
                              <small className="text-muted">Materials</small>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="text-center p-2 bg-light rounded">
                              <div className="fw-bold">PDF</div>
                              <small className="text-muted">Format</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="glass-card p-4 rounded-3">
                    <h5 className="fw-bold mb-3">Student Reviews</h5>
                    <div className="text-center py-4">
                      <Star size={48} className="text-muted mb-3" />
                      <h6 className="text-muted">Reviews coming soon</h6>
                      <p className="text-muted small">Be the first to review this bundle!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="glass-card p-4 rounded-3">
                <h5 className="fw-bold mb-3">Quick Actions</h5>
                
                {bundle.price === 0 ? (
                  <button 
                    className="btn btn-success btn-lg w-100 mb-3"
                    onClick={() => onDownload(bundle)}
                  >
                    <CircleArrowDown size={20} className="me-2" />
                    Download Free
                  </button>
                ) : (
                  <button 
                    className="btn qsolve-btn-primary btn-lg w-100 mb-3"
                    onClick={() => onPurchase(bundle)}
                  >
                    Buy Now - ₹{bundle.price}
                  </button>
                )}

                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary">
                    <Play size={16} className="me-2" />
                    Preview Sample
                  </button>
                  <button className="btn btn-outline-secondary">
                    <Share2 size={16} className="me-2" />
                    Share Bundle
                  </button>
                </div>

                <hr />

                <div className="small text-muted">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Category:</span>
                    <span className="fw-semibold">{bundle.departmentName}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Materials:</span>
                    <span className="fw-semibold">{materials.length || subjects.length}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Access:</span>
                    <span className="fw-semibold">Lifetime</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Support:</span>
                    <span className="fw-semibold">24/7</span>
                  </div>
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