import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const CTASection = ({ onViewAllMaterials }) => {
  const features = [
    "Premium study materials",
    "Expert-crafted question papers", 
    "Detailed solution guides",
    "24/7 student support",
    "Lifetime access guarantee",
    "Mobile-friendly platform"
  ];

  return (
    <section className="py-5 position-relative overflow-hidden" style={{
      background: '#000000'
    }}>
      
      <div className="position-absolute w-100 h-100">
        <div className="floating-element position-absolute" style={{
          top: '10%',
          left: '5%',
          width: '120px',
          height: '120px',
          background: 'rgba(76, 175, 80, 0.05)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div className="floating-element position-absolute" style={{
          bottom: '15%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(76, 175, 80, 0.03)',
          borderRadius: '30%',
          backdropFilter: 'blur(15px)'
        }}></div>
      </div>

      <div className="container position-relative" style={{ color: '#ffffff' }}>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mb-4">
              <div className="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-3" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
                <Sparkles size={16} className="me-2" style={{ color: '#4CAF50' }} />
                <small className="fw-medium">Limited Time Offer</small>
              </div>

              <h2 className="display-4 fw-bold mb-3" style={{ color: '#ffffff' }}>
                Start Your Success
                <br />
                <span style={{ color: '#4CAF50' }}>Journey Today!</span>
              </h2>

              <p className="lead mb-4" style={{ color: '#d0d0d0' }}>
                Join thousands of students who have transformed their academic performance with QSolve's comprehensive study platform. Get instant access to premium materials and expert guidance.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <button 
                  className="btn btn-lg d-flex align-items-center justify-content-center"
                  onClick={onViewAllMaterials}
                  style={{ background: '#4CAF50', color: '#000000', fontWeight: 700, border: 'none' }}
                >
                  Explore All Materials
                  <ArrowRight size={20} className="ms-2" />
                </button>
                <button className="btn btn-lg" style={{ background: 'transparent', border: '2px solid #4CAF50', color: '#4CAF50' }}>
                  Download Free Sample
                </button>
              </div>

              <div className="d-flex align-items-center">
                <div className="d-flex me-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="rounded-circle me-n2"
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '2px solid #4CAF50',
                        backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  ))}
                </div>
                <small style={{ color: '#a0a0a0' }}>
                  <strong style={{ color: '#ffffff' }}>2,500+</strong> students joined this week
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-4 rounded-4" style={{ background: '#1a1a1a', border: '1px solid rgba(76, 175, 80, 0.2)', boxShadow: '0 20px 40px rgba(76, 175, 80, 0.1)', color: '#ffffff' }}>
              <h4 className="fw-bold mb-4 text-center" style={{ color: '#ffffff' }}>
                What You Get With QSolve
              </h4>

              <div className="row g-3">
                {features.map((feature, index) => (
                  <div key={index} className="col-12">
                    <div className="d-flex align-items-center">
                      <CheckCircle size={20} className="me-3 flex-shrink-0" style={{ color: '#4CAF50' }} />
                      <span style={{ color: '#d0d0d0' }}>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(76, 175, 80, 0.08)', marginTop: 24, border: '1px solid rgba(76, 175, 80, 0.2)' }}>
                <div className="text-center">
                  <div className="h5 fw-bold mb-1" style={{ color: '#ffffff' }}>Special Launch Price</div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="h3 fw-bold" style={{ color: '#4CAF50', marginRight: 8 }}>₹299</span>
                    <small className="text-decoration-line-through" style={{ color: '#707070' }}>₹999</small>
                  </div>
                  <small style={{ color: '#a0a0a0' }}>70% OFF - Limited Time Only</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="row mt-5 pt-4 border-top border-opacity-25" style={{ borderColor: 'rgba(76, 175, 80, 0.3)' }}>
          <div className="col-12 text-center">
            <p className="mb-3" style={{ color: '#a0a0a0' }}>Trusted by students from top institutions</p>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>IIT</div>
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>NIT</div>
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>AIIMS</div>
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>DU</div>
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>JNU</div>
              <div className="badge px-3 py-2" style={{ background: '#1a1a1a', color: '#4CAF50', border: '1px solid rgba(76, 175, 80, 0.3)' }}>BHU</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;