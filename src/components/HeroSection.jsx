import { ArrowRight, Play, Star, Users, BookOpen } from 'lucide-react';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="qsolve-hero d-flex align-items-center position-relative">
      {/* Floating Background Elements */}
      <div className="position-absolute w-100 h-100">
        <div className="floating-element position-absolute" style={{
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div className="floating-element position-absolute" style={{
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '30%',
          backdropFilter: 'blur(15px)'
        }}></div>
        <div className="floating-element position-absolute" style={{
          bottom: '20%',
          left: '20%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '20%',
          backdropFilter: 'blur(12px)'
        }}></div>
      </div>

      <div className="container qsolve-hero-content">
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-6">
            <div className="text-white">
              {/* Badge */}
              <div className="d-inline-flex align-items-center glass-card px-3 py-2 rounded-pill mb-4">
                <Star size={16} className="text-warning me-2" />
                <small className="fw-medium">Trusted by 10,000+ Students</small>
              </div>

              {/* Main Headline */}
              <h1 className="display-1-modern mb-4">
                Master Your
                <br />
                <span className="text-gradient">Academic Journey</span>
              </h1>

              {/* Subheading */}
              <p className="lead mb-5 opacity-90" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
                Access premium study materials, question papers, and expert guidance 
                to excel in your exams with QSolve's comprehensive learning platform.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                <button 
                  className="btn qsolve-btn-primary btn-lg d-flex align-items-center justify-content-center"
                  onClick={onGetStarted}
                >
                  Get Started Free
                  <ArrowRight size={20} className="ms-2" />
                </button>
                <button className="btn qsolve-btn-secondary btn-lg d-flex align-items-center justify-content-center">
                  <Play size={20} className="me-2" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="row g-4">
                <div className="col-4">
                  <div className="stat-counter">
                    <div className="h3 fw-bold mb-1">10K+</div>
                    <small className="opacity-75">Students</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-counter">
                    <div className="h3 fw-bold mb-1">500+</div>
                    <small className="opacity-75">Study Materials</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-counter">
                    <div className="h3 fw-bold mb-1">95%</div>
                    <small className="opacity-75">Success Rate</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="position-relative">
              {/* Hero Image */}
              <div className="glass-card p-4 rounded-3">
                <img 
                  src="https://images.unsplash.com/photo-1623021317626-3770c4247925?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBib29rcyUyMHdvcmtzcGFjZXxlbnwwfDB8fHwxNzU4ODk1MjE3fDA&ixlib=rb-4.1.0&q=85"
                  alt="happy student studying with books modern workspace - Yungchuan KO on Unsplash"
                  className="img-fluid rounded-3"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

              {/* Floating Achievement Cards */}
              <div className="position-absolute top-0 start-0 translate-middle">
                <div className="glass-card p-3 rounded-3 text-white">
                  <div className="d-flex align-items-center">
                    <BookOpen size={20} className="text-success me-2" />
                    <div>
                      <div className="fw-bold">98%</div>
                      <small>Pass Rate</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-absolute bottom-0 end-0 translate-middle">
                <div className="glass-card p-3 rounded-3 text-white">
                  <div className="d-flex align-items-center">
                    <Users size={20} className="text-info me-2" />
                    <div>
                      <div className="fw-bold">24/7</div>
                      <small>Support</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;