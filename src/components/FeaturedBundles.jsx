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
    <section className="py-5" style={{ background: '#f8fafc' }}>
      <div className="container">
       
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="display-4 fw-bold mb-3">
              Premium <span className=""style={{color:"#FFD700"}} >Study Bundles</span>
            </h2>
            <p className="lead text-muted">
              Carefully curated study materials designed by experts to help you achieve academic excellence
            </p>
          </div>
        </div>

    
        

        
        <div className="row g-4 mb-5">
          {bundles.slice(0, 3).map((bundle, index) => (
            <div key={bundle.id || bundle._id} className={`col-lg-${index === 0 ? '6' : '4'} col-md-6`}>
              <div
                className="h-100 p-4"
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  border: index === 0 ? '2px solid #1a365d' : '1px solid rgba(26,54,93,0.06)',
                  boxShadow: '0 20px 40px rgba(26,54,93,0.04)',
                  position: 'relative',
                  color: '#1a365d'
                }}
              >
                {index === 0 && (
                  <div className="position-absolute" style={{ top: -18, left: 24 }}>
                    <span className="badge" style={{ background: '#FFD700', color: '#1a365d', padding: '0.5rem 0.9rem', borderRadius: '999px', fontWeight: 700 }}>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="d-flex flex-column h-100">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0" style={{ color: '#1a365d' }}>{bundle.name}</h5>
                      <span className="badge" style={{ background: 'rgba(255,215,0,0.12)', color: '#1a365d', padding: '0.25rem 0.6rem', borderRadius: '999px', fontWeight: 600 }}>
                        Premium
                      </span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <div className="h4 fw-bold text-dark mb-0" style={{ color: '#1a365d' }}>₹{bundle.price}</div>
                      <div className="ms-2">
                        <small className="text-decoration-line-through text-muted">₹{Math.round(bundle.price * 1.5)}</small>
                      </div>
                    </div>

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
                        {bundle.rating || '4.5'} ({Math.floor(Math.random() * 500) + 100} reviews)
                      </small>
                    </div>
                  </div>

                  <p className="text-muted mb-4 flex-grow-1" style={{ color: '#4a5568' }}>
                    {bundle.description || 'Comprehensive study materials with practice questions, detailed solutions, and expert guidance to help you excel in your exams.'}
                  </p>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-outline-primary flex-fill"
                      onClick={() => onBundleClick(bundle)}
                      style={{ border: '1px solid rgba(26,54,93,0.08)', color: '#1a365d', background: 'white', fontWeight: 700 }}
                    >
                      Preview
                    </button>
                    <button
                      className={`btn flex-fill`}
                      onClick={() => onBundleClick(bundle)}
                      style={{
                        background: 'linear-gradient(90deg, #1a365d, #28415a)',
                        border: 'none',
                        color: 'white',
                        fontWeight: 700
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBundles;