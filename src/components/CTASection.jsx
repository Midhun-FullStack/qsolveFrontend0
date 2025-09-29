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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Animated Background */}
      <div className="position-absolute w-100 h-100">
        <div className="floating-element position-absolute" style={{
          top: '10%',
          left: '5%',
          width: '120px',
          height: '120px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div className="floating-element position-absolute" style={{
          bottom: '15%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '30%',
          backdropFilter: 'blur(15px)'
        }}></div>
      </div>

      <div className="container position-relative text-white">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="mb-4">
              <div className="d-inline-flex align-items-center glass-card px-3 py-2 rounded-pill mb-3">
                <Sparkles size={16} className="text-warning me-2" />
                <small className="fw-medium">Limited Time Offer</small>
              </div>
              
              <h2 className="display-4 fw-bold mb-3">
                Start Your Success
                <br />
                <span className="text-warning">Journey Today!</span>
              </h2>
              
              <p className="lead mb-4 opacity-90">
                Join thousands of students who have transformed their academic performance 
                with QSolve's comprehensive study platform. Get instant access to premium 
                materials and expert guidance.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <button 
                  className="btn btn-light btn-lg text-primary fw-bold d-flex align-items-center justify-content-center"
                  onClick={onViewAllMaterials}
                >
                  Explore All Materials
                  <ArrowRight size={20} className="ms-2" />
                </button>
                <button className="btn btn-outline-light btn-lg">
                  Download Free Sample
                </button>
              </div>

              <div className="d-flex align-items-center">
                <div className="d-flex me-3">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="rounded-circle border border-2 border-white me-n2"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundImage: `url(https://i.pravatar.cc/150?img=${i + 10})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                  ))}
                </div>
                <small className="opacity-75">
                  <strong>2,500+</strong> students joined this week
                </small>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="glass-card p-4 rounded-3">
              <h4 className="fw-bold mb-4 text-center">
                What You Get With QSolve
              </h4>
              
              <div className="row g-3">
                {features.map((feature, index) => (
                  <div key={index} className="col-12">
                    <div className="d-flex align-items-center">
                      <CheckCircle size={20} className="text-success me-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-3" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div className="text-center">
                  <div className="h5 fw-bold mb-1">Special Launch Price</div>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="h3 fw-bold text-warning me-2">₹299</span>
                    <small className="text-decoration-line-through opacity-75">₹999</small>
                  </div>
                  <small className="opacity-75">70% OFF - Limited Time Only</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="row mt-5 pt-4 border-top border-light border-opacity-25">
          <div className="col-12 text-center">
            <p className="mb-3 opacity-75">Trusted by students from top institutions</p>
            <div className="d-flex flex-wrap justify-content-center align-items-center gap-4">
              <div className="badge bg-light text-dark px-3 py-2">IIT</div>
              <div className="badge bg-light text-dark px-3 py-2">NIT</div>
              <div className="badge bg-light text-dark px-3 py-2">AIIMS</div>
              <div className="badge bg-light text-dark px-3 py-2">DU</div>
              <div className="badge bg-light text-dark px-3 py-2">JNU</div>
              <div className="badge bg-light text-dark px-3 py-2">BHU</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;