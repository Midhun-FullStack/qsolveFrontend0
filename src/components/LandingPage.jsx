import { ArrowRight, BookOpen, Users, Download } from 'lucide-react';

const LandingPage = ({ onGetStarted, onLogin }) => {
  const styles = `
    .landing-btn {
      transition: all 0.3s ease;
    }
    
    .landing-btn-primary {
      background: #6366f1;
      color: white;
      border: none;
    }
    
    .landing-btn-primary:hover {
      background: #5855eb;
      transform: translateY(-2px);
    }
    
    .landing-btn-outline {
      background: transparent;
      color: #6366f1;
      border: 2px solid #6366f1;
    }
    
    .landing-btn-outline:hover {
      background: rgba(99, 102, 241, 0.1);
      border-color: #5855eb;
      color: #5855eb;
    }
    
    .stat-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 12px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.4);
    }
  `;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'rgba(15, 20, 40, 0.9)', padding: '1rem 3rem' }}>
        <span className="navbar-brand" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Q SOLVE
        </span>

      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 3rem'
      }}>
        <div style={{ width: '100%' }}>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                fontWeight: 'bold',
                marginBottom: '2rem',
                lineHeight: '1.1'
              }}>
                Master Engineering with{' '}
                <span style={{
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Q Solve
                </span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: '#e2e8f0',
                marginBottom: '3rem',
                lineHeight: '1.6',
                maxWidth: '500px'
              }}>
                Access comprehensive question papers, practice tests, and study materials
                for Mechanical and Civil Engineering. Prepare smarter, not harder.
              </p>

              {/* CTA Buttons */}
              <div className="d-flex flex-wrap gap-3 mb-5">
                <button
                  className="btn btn-lg landing-btn landing-btn-primary d-inline-flex align-items-center"
                  style={{ padding: '1rem 2rem', borderRadius: '8px', fontWeight: '600' }}
                  onClick={onGetStarted}
                >
                  Start Learning Today
                  <ArrowRight size={20} className="ms-2" />
                </button>
                <button
                  className="btn btn-lg landing-btn landing-btn-outline d-inline-flex align-items-center"
                  style={{ padding: '1rem 2rem', borderRadius: '8px', fontWeight: '600' }}
                  onClick={onLogin}
                >
                  Sign In
                </button>
              </div>

              {/* Stats */}
              <div className="row g-4">
                <div className="col-4">
                  <div className="stat-card text-center p-3">
                    <div className="h4 fw-bold mb-1" style={{ color: '#6366f1' }}>10K+</div>
                    <small style={{ color: '#cbd5e1' }}>Question Papers</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card text-center p-3">
                    <div className="h4 fw-bold mb-1" style={{ color: '#6366f1' }}>50K+</div>
                    <small style={{ color: '#cbd5e1' }}>Students</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="stat-card text-center p-3">
                    <div className="h4 fw-bold mb-1" style={{ color: '#6366f1' }}>99%</div>
                    <small style={{ color: '#cbd5e1' }}>Success Rate</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="col-lg-6">
              <div className="row g-4">
                <div className="col-12">
                  <div style={{
                    background: 'rgba(15, 20, 40, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        background: '#6366f1',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginRight: '1rem'
                      }}>
                        <BookOpen size={24} color="white" />
                      </div>
                      <h5 className="mb-0" style={{ color: 'white' }}>Extensive Question Bank</h5>
                    </div>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>
                      Access thousands of carefully curated question papers from top engineering colleges
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div style={{
                    background: 'rgba(15, 20, 40, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        background: '#8b5cf6',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginRight: '1rem'
                      }}>
                        <Users size={24} color="white" />
                      </div>
                      <h5 className="mb-0" style={{ color: 'white' }}>Community Driven</h5>
                    </div>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>
                      Join a community of over 50,000 engineering students preparing together
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div style={{
                    background: 'rgba(15, 20, 40, 0.8)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <div className="d-flex align-items-center mb-3">
                      <div style={{
                        background: '#6366f1',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginRight: '1rem'
                      }}>
                        <Download size={24} color="white" />
                      </div>
                      <h5 className="mb-0" style={{ color: 'white' }}>Proven Results</h5>
                    </div>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>
                      99% of our users report improved exam performance and better grades
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;