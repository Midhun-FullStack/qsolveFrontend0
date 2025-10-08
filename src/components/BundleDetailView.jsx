import {
  X, Star, Download, Share2, Bookmark, Play, FileText,
  Clock, Users, CheckCircle, ArrowLeft, CircleArrowDown, Lock
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const MaterialCard = ({ material, onDownload, isPaid }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleDownload = async () => {
    if (!isPaid) return;
    setIsDownloading(true);
    try {
      await onDownload(material);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  return (
    <div className="glass-card p-3 rounded-3 mb-3" style={{ transition: 'transform 0.18s ease, box-shadow 0.18s ease', background: 'rgba(255,255,255,0.98)', border: '1px solid rgba(26,54,93,0.06)', color: '#1a365d' }}>
      <div className="d-flex justify-content-between align-items-start">
        <div className="flex-grow-1" onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
          <div className="d-flex align-items-center mb-2">
            <FileText size={16} className="text-primary me-2" />
            <h6 className="mb-0 fw-semibold">{material.subject || material.title}</h6>
            <small className="ms-3 text-muted">{material.size || ''}</small>
          </div>
          <p className="text-muted small mb-2" style={{ maxHeight: expanded ? '200px' : '40px', overflow: 'hidden', transition: 'max-height 0.25s ease' }}>
            {material.description || 'Study material with comprehensive coverage'}
          </p>
          <div className="d-flex align-items-center text-sm">
            <Clock size={12} className="text-muted me-1" />
            <small className="text-muted">PDF Document • Updated recently</small>
          </div>
        </div>

          <div className="ms-3 d-flex flex-column align-items-end">
          <button
            className={`btn btn-sm mb-2 d-flex align-items-center`}
            onClick={handleDownload}
            disabled={isDownloading || !isPaid}
            aria-label={isPaid ? `Download ${material.title}` : 'Locked, purchase to download'}
            title={isPaid ? 'Download' : 'Locked'}
            style={isDownloading ? { background: 'rgba(0,0,0,0.06)', color: '#1a365d', border: 'none' } : isPaid ? { background: 'linear-gradient(90deg, #FFD700, #FFC107)', color: '#1a365d', border: 'none' } : { background: 'transparent', color: '#6c757d', border: '1px solid rgba(108,117,125,0.12)' }}
          >
            {isDownloading ? (
              <>
                <div className="spinner-border spinner-border-sm me-1" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="d-none d-sm-inline">Downloading...</span>
              </>
            ) : isPaid ? (
              <>
                <CircleArrowDown size={14} className="me-1" />
                <span className="d-none d-sm-inline">Download</span>
              </>
            ) : (
              <>
                <Lock size={14} className="me-1" />
                <span className="d-none d-sm-inline">Locked</span>
              </>
            )}
          </button>

          <button
            className="btn btn-sm"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            title={expanded ? 'Collapse details' : 'Expand details'}
            style={{ border: '1px solid rgba(26,54,93,0.08)', color: '#1a365d', background: 'white' }}
          >
            {expanded ? 'Hide' : 'Details'}
          </button>
        </div>
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
  , startPayment, onPaymentStarted
}) => {
  const [activeTab, setActiveTab] = useState('materials');
  const [isPaid, setIsPaid] = useState(bundle?.price === 0); // Free bundles are paid by default
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!isOpen || !bundle) return null;

  // if parent requested to start payment, open form and notify parent
  if (startPayment) {
    if (!showPaymentForm) setShowPaymentForm(true);
    if (typeof onPaymentStarted === 'function') onPaymentStarted();
  }

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
      background: 'rgba(10,10,10,0.35)',
      backdropFilter: 'blur(6px)'
    }}>
      {/* Header */}
      <div className="sticky-top" style={{
        background: 'white',
        color: '#1a365d',
        backdropFilter: 'blur(6px)',
        borderBottom: '1px solid rgba(26,54,93,0.06)',
        boxShadow: '0 6px 24px rgba(26,54,93,0.06)'
      }}>
        <div className="container-fluid">
          <div className="row align-items-center py-4">
            <div className="col-auto">
              <button
                className="btn rounded-circle p-3 shadow-sm"
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  color: '#6c757d',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            <div className="col">
              <h3 className="mb-1 fw-bold" style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.5rem'
              }}>
                {bundle.title || bundle.name}
              </h3>
              <small className="text-muted fw-medium">{bundle.departmentName}</small>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-3">
                <button
                  className="btn rounded-circle p-3 shadow-sm"
                  onClick={() => onBookmarkToggle(bundle)}
                  style={{
                    background: isBookmarked ? 'linear-gradient(135deg, #ffd700, #ffb347)' : 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    color: isBookmarked ? 'white' : '#6c757d',
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
                    background: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    color: '#6c757d',
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

      <div className="container-fluid" style={{ paddingTop: '100px', paddingBottom: '100px', height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="pe-lg-4">
              {/* Bundle Hero */}
              <div className="position-relative overflow-hidden rounded-4 mb-4" style={{
                background: 'white',
                backdropFilter: 'none',
                border: '1px solid rgba(26,54,93,0.06)',
                boxShadow: '0 20px 40px rgba(26,54,93,0.06)'
              }}>
                <div className="p-5" style={{ color: '#1a365d' }}>
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <div className="mb-4">
                        <span className="badge px-3 py-2 rounded-pill mb-3" style={{
                          background: 'linear-gradient(90deg, #FFD700, #FFC107)',
                          color: '#1a365d',
                          fontSize: '0.75rem',
                          fontWeight: '700'
                        }}>
                          {bundle.departmentName}
                        </span>
                        <h1 className="display-5 fw-bold mb-3" style={{
                          color: '#1a365d'
                        }}>
                          {bundle.title || bundle.name}
                        </h1>
                        <p className="lead mb-4" style={{ lineHeight: '1.6', color: '#4a5568' }}>
                          {bundle.description || "Comprehensive study materials designed to help you excel in your academic journey with expert-crafted content and detailed explanations."}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="row g-4 mb-4" style={{ color: '#1a365d' }}>
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(26,54,93,0.05)',
                            border: '1px solid rgba(26,54,93,0.08)'
                          }}>
                            <Star size={20} className="me-3" style={{ color: '#FFD700' }} fill="currentColor" />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#1a365d' }}>{bundle.rating || '4.5'}</div>
                              <small className="text-muted">({Math.floor(Math.random() * 200) + 50} reviews)</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(26,54,93,0.05)',
                            border: '1px solid rgba(26,54,93,0.08)'
                          }}>
                            <Users size={20} className="me-3" style={{ color: '#FFD700' }} />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#1a365d' }}>{Math.floor(Math.random() * 500) + 100}</div>
                              <small className="text-muted">Students</small>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="d-flex align-items-center p-3 rounded-3" style={{
                            background: 'rgba(26,54,93,0.05)',
                            border: '1px solid rgba(26,54,93,0.08)'
                          }}>
                            <Download size={20} className="me-3" style={{ color: '#FFD700' }} />
                            <div>
                              <div className="h5 fw-bold mb-0" style={{ color: '#1a365d' }}>{Math.floor(Math.random() * 1000) + 500}</div>
                              <small className="text-muted">Downloads</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                        <div className="col-md-4 text-center">
                      <div className="p-4 rounded-4" style={{
                        background: 'rgba(26,54,93,0.03)',
                        border: '2px solid rgba(26,54,93,0.06)',
                        backdropFilter: 'none'
                      }}>
                        <div className="mb-3">
                          {bundle.price === 0 ? (
                            <div className="display-4 fw-bold text-success mb-2">Free</div>
                          ) : (
                            <>
                              <div className="display-4 fw-bold mb-2" style={{ color: '#1a365d' }}>
                                ₹{bundle.price}
                              </div>
                              <small className="text-decoration-line-through text-muted h6">
                                ₹{Math.round(bundle.price * 1.4)}
                              </small>
                            </>
                          )}
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-3">
                          <Clock size={16} className="me-2" style={{ color: '#4a5568' }} />
                          <small style={{ color: '#4a5568', fontWeight: 500 }}>Lifetime Access</small>
                        </div>
                        {isPaid && bundle.price > 0 && (
                          <div className="mt-2 badge rounded-pill" style={{ background: '#28a745', color: 'white' }}>Unlocked</div>
                        )}
                        <div className="badge px-3 py-2 rounded-pill" style={{
                          background: 'linear-gradient(90deg, #FFD700, #FFC107)',
                          color: '#1a365d',
                          fontWeight: '700'
                        }}>
                          <CheckCircle size={14} className="me-1" />
                          Verified Content
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-5">
                <div className="d-flex justify-content-center">
                  <div className="bg-white rounded-pill p-2 shadow-sm" style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="d-flex">
                      <button
                        className={`btn rounded-pill px-4 py-2 me-2 ${activeTab === 'materials' ? '' : 'btn-outline-primary'}`}
                        onClick={() => setActiveTab('materials')}
                        style={{
                          background: activeTab === 'materials' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                          color: activeTab === 'materials' ? 'white' : '#6c757d',
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
                        className={`btn rounded-pill px-4 py-2 me-2 ${activeTab === 'preview' ? '' : 'btn-outline-primary'}`}
                        onClick={() => setActiveTab('preview')}
                        style={{
                          background: activeTab === 'preview' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                          color: activeTab === 'preview' ? 'white' : '#6c757d',
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
                        className={`btn rounded-pill px-4 py-2 ${activeTab === 'reviews' ? '' : 'btn-outline-primary'}`}
                        onClick={() => setActiveTab('reviews')}
                        style={{
                          background: activeTab === 'reviews' ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                          color: activeTab === 'reviews' ? 'white' : '#6c757d',
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
                    <h5 className="fw-bold mb-3">Study Materials</h5>

                    {/* Question Bank Materials */}
                    {(materials.length > 0 ? materials : subjects).length > 0 && (
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6 className="text-muted mb-0">Question Banks</h6>
                          {isPaid && (
                            <button
                              className="btn btn-outline-primary btn-sm d-flex align-items-center"
                              onClick={() => {
                                const items = materials.length > 0 ? materials : subjects;
                                items.forEach(item => onDownload(item));
                              }}
                              style={{
                                border: '2px solid rgba(102, 126, 234, 0.3)',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = 'transparent';
                                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                              }}
                            >
                              <CircleArrowDown size={16} className="me-2" />
                              Download All
                            </button>
                          )}
                        </div>
                        {(materials.length > 0 ? materials : subjects).map((item, index) => (
                          <MaterialCard
                            key={item._id || index}
                            material={item}
                            onDownload={onDownload}
                            isPaid={isPaid}
                          />
                        ))}
                      </div>
                    )}

                    {/* Direct PDF Files */}
                    {bundle.files && bundle.files.length > 0 && (
                      <div className="mb-4">
                        <h6 className="text-muted mb-3">Direct PDFs</h6>
                        {bundle.files.map((file, index) => (
                          <MaterialCard
                            key={`direct-${index}`}
                            material={{
                              title: file.originalName || file.filename || `Document ${index + 1}`,
                              subject: 'Direct Upload',
                              description: 'PDF file uploaded directly to this bundle',
                              fileUrl: file.url || file.path
                            }}
                            onDownload={onDownload}
                            isPaid={isPaid}
                          />
                        ))}
                      </div>
                    )}

                    {/* No materials message */}
                    {materials.length === 0 && subjects.length === 0 && (!bundle.files || bundle.files.length === 0) && (
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
                              <div className="fw-bold">{(materials.length || subjects.length) + (bundle.files ? bundle.files.length : 0)}</div>
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
            <div className="sticky-top" style={{ top: '120px' }}>
              <div className="rounded-4 overflow-hidden shadow-lg" style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div className="p-4">
                  <h4 className="fw-bold mb-4" style={{
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Quick Actions
                  </h4>

                      {showPaymentForm ? (
                    <PaymentForm
                      amount={bundle.price}
                      onPaymentSuccess={() => {
                        setIsPaid(true);
                        setShowPaymentForm(false);
                        toast.success('Payment successful — PDFs unlocked');
                      }}
                      onSuccess={() => {
                        setIsPaid(true);
                        setShowPaymentForm(false);
                        toast.success('Payment successful — PDFs unlocked');
                      }}
                      onCancel={() => setShowPaymentForm(false)}
                    />
                  ) : (
                    <>
                      {bundle.price === 0 ? (
                        <button
                          className="btn btn-lg w-100 mb-4 rounded-pill shadow-sm"
                          onClick={() => onDownload(bundle)}
                          style={{
                            background: 'linear-gradient(135deg, #28a745, #20c997)',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600',
                            padding: '0.875rem 1.5rem',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <CircleArrowDown size={20} className="me-2" />
                          Download Free
                        </button>
                      ) : (
                        <button
                          className="btn btn-lg w-100 mb-4 rounded-pill shadow-sm"
                          onClick={() => setShowPaymentForm(true)}
                          style={{
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600',
                            padding: '0.875rem 1.5rem',
                            transition: 'all 0.3s ease',
                            transform: 'translateY(0)'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          Buy Now - ₹{bundle.price}
                        </button>
                      )}

                      {isPaid && bundle.price > 0 && (
                        <button
                          className="btn btn-lg w-100 mb-4 rounded-pill shadow-sm"
                          onClick={() => onDownload(bundle)}
                          style={{
                            background: 'linear-gradient(135deg, #28a745, #20c997)',
                            border: 'none',
                            color: 'white',
                            fontWeight: '600',
                            padding: '0.875rem 1.5rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                          <CircleArrowDown size={20} className="me-2" />
                          Download Bundle
                        </button>
                      )}

                      <div className="d-grid gap-3 mb-4">
                        <button
                          className="btn btn-outline-primary rounded-pill d-flex align-items-center justify-content-center"
                          style={{
                            padding: '0.75rem 1rem',
                            border: '2px solid rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.18s ease'
                          }}
                          onClick={() => setPreviewOpen(true)}
                        >
                          <Play size={18} className="me-2" />
                          Preview Sample
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-pill d-flex align-items-center justify-content-center"
                          style={{
                            padding: '0.75rem 1rem',
                            border: '2px solid rgba(108, 117, 125, 0.3)',
                            transition: 'all 0.18s ease'
                          }}
                          onClick={() => navigator.share ? navigator.share({ title: bundle.title, text: bundle.description, url: window.location.href }) : toast.info('Share your bundle link')}
                        >
                          <Share2 size={18} className="me-2" />
                          Share Bundle
                        </button>
                      </div>
                    </>
                  )}

                  <div className="border-top pt-4" style={{ borderColor: 'rgba(0, 0, 0, 0.06) !important' }}>
                    <h6 className="fw-bold mb-3" style={{ color: '#1a365d' }}>Bundle Details</h6>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3" style={{ background: 'rgba(26,54,93,0.03)' }}>
                        <span className="small" style={{ color: '#6c757d' }}>Category</span>
                        <span className="fw-semibold small" style={{ color: '#1a365d' }}>{bundle.departmentName}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3" style={{ background: 'rgba(26,54,93,0.03)' }}>
                        <span className="small" style={{ color: '#6c757d' }}>Materials</span>
                        <span className="fw-semibold small" style={{ color: '#1a365d' }}>{(materials.length || subjects.length) + (bundle.files ? bundle.files.length : 0)}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3" style={{ background: 'rgba(26,54,93,0.03)' }}>
                        <span className="small" style={{ color: '#6c757d' }}>Access</span>
                        <span className="fw-semibold small" style={{ color: '#1a365d' }}>Lifetime</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-2 rounded-3" style={{ background: 'rgba(26,54,93,0.03)' }}>
                        <span className="small" style={{ color: '#6c757d' }}>Support</span>
                        <span className="fw-semibold small" style={{ color: '#1a365d' }}>24/7</span>
                      </div>
                    </div>
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

// Lightweight preview modal used by BundleDetailView
const PreviewModal = ({ open, onClose, bundle }) => {
  if (!open) return null;
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1060, background: 'rgba(10,10,10,0.5)' }}>
      <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: 'min(900px, 95%)', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="fw-bold mb-0">Preview — {bundle.title || bundle.name}</h5>
          <button className="btn btn-sm btn-light" onClick={onClose}><X /></button>
        </div>
        <div>
          <p className="text-muted">{bundle.description}</p>
          <hr />
          <div className="ratio ratio-16x9 bg-light rounded overflow-hidden">
            <div className="d-flex align-items-center justify-content-center h-100 w-100">
              <Play size={40} className="text-muted" />
            </div>
          </div>
          <small className="text-muted d-block mt-3">This is a sample preview. For a real preview, replace with an embedded PDF or video sample.</small>
        </div>
      </div>
    </div>
  );
};

export default BundleDetailView;