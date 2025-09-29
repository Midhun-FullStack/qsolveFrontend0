import { Star, Download, Clock, Users, ArrowRight } from 'lucide-react';

const FeaturedBundles = ({ bundles, onBundleClick }) => {
  if (!bundles || bundles.length === 0) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading study materials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-4 fw-bold mb-3">
              Premium <span className="text-gradient">Study Bundles</span>
            </h2>
            <p className="lead text-muted">
              Carefully curated study materials designed by experts to help you achieve academic excellence
            </p>
          </div>
        </div>

        {/* Featured Bundle Grid */}
        <div className="row g-4 mb-5">
          {bundles.slice(0, 3).map((bundle, index) => (
            <div 
              key={bundle.id} 
              className={`col-lg-${index === 0 ? '6' : '3'} col-md-6`}
            >
              <div className={`bundle-card-modern h-100 p-4 ${index === 0 ? 'border-primary border-2' : ''}`}>
                {index === 0 && (
                  <div className="position-absolute top-0 start-50 translate-middle">
                    <span className="badge bg-primary px-3 py-2 rounded-pill">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="d-flex flex-column h-100">
                  {/* Bundle Header */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-primary mb-0">{bundle.name}</h5>
                      <span className="badge bg-success-subtle text-success px-2 py-1 rounded-pill">
                        Premium
                      </span>
                    </div>
                    
                    <div className="d-flex align-items-center mb-2">
                      <div className="h4 fw-bold text-dark mb-0">₹{bundle.price}</div>
                      <div className="ms-2">
                        <small className="text-decoration-line-through text-muted">₹{Math.round(bundle.price * 1.5)}</small>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex me-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={`${i < Math.floor(bundle.rating || 4.5) ? 'text-warning' : 'text-muted'}`}
                            fill={i < Math.floor(bundle.rating || 4.5) ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <small className="text-muted">
                        {bundle.rating || "4.5"} ({Math.floor(Math.random() * 500) + 100} reviews)
                      </small>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-secondary mb-4 flex-grow-1">
                    {bundle.description || "Comprehensive study materials with practice questions, detailed solutions, and expert guidance to help you excel in your exams."}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="row g-2 text-sm">
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <Download size={14} className="text-primary me-2" />
                          <small>PDF Downloads</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <Clock size={14} className="text-success me-2" />
                          <small>Lifetime Access</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <Users size={14} className="text-info me-2" />
                          <small>Expert Support</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center">
                          <Star size={14} className="text-warning me-2" />
                          <small>Premium Quality</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-outline-primary flex-fill"
                      onClick={() => onBundleClick(bundle)}
                    >
                      Preview
                    </button>
                    <button
                      className={`btn ${index === 0 ? 'qsolve-btn-primary' : 'btn-primary'} flex-fill`}
                      onClick={() => onBundleClick(bundle)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Bundles Grid */}
        {bundles.length > 3 && (
          <div className="row g-4">
            {bundles.slice(3).map((bundle) => (
              <div key={bundle.id} className="col-lg-4 col-md-6">
                <div className="bundle-card-modern h-100 p-4">
                  <div className="d-flex flex-column h-100">
                    {/* Bundle Header */}
                    <div className="mb-3">
                      <h6 className="fw-bold text-primary mb-2">{bundle.name}</h6>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="h5 fw-bold text-dark mb-0">₹{bundle.price}</div>
                        <div className="d-flex align-items-center">
                          <Star size={12} className="text-warning me-1" />
                          <small className="text-muted">{bundle.rating || "4.5"}</small>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary small mb-3 flex-grow-1">
                      {bundle.description || "Quality study materials for effective exam preparation."}
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary flex-fill"
                        onClick={() => onBundleClick(bundle)}
                      >
                        Preview
                      </button>
                      <button
                        className="btn btn-sm btn-primary flex-fill"
                        onClick={() => onBundleClick(bundle)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-5">
          <button className="btn qsolve-btn-secondary btn-lg">
            View All Study Materials
            <ArrowRight size={20} className="ms-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles;