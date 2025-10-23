import { memo } from 'react';
import { BookOpen, Users, Download, ArrowRight } from 'lucide-react';

const Hero = memo(() => {

  const styles = `
    .hero-cta-btn {
      background: #6366f1;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .hero-cta-btn:hover {
      background: #5855eb;
      transform: translateY(-2px);
    }

    .stat-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.4);
    }
  `;

  const stats = [
    { icon: BookOpen, value: 500, label: 'Study Materials', suffix: '+' },
    { icon: Users, value: 10, label: 'Active Students', suffix: 'K+' },
    { icon: Download, value: 25, label: 'Downloads', suffix: 'K+' }
  ];

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '2rem 0'
      }}
    >
      <style>{styles}</style>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Main Hero Content */}
            <div className="text-center mb-5">
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Engineer the Future
              </h1>
              <p
                style={{
                  fontSize: '1.2rem',
                  color: '#e2e8f0',
                  maxWidth: '600px',
                  margin: '0 auto 3rem',
                  lineHeight: '1.6'
                }}
              >
                Master engineering concepts with our comprehensive study materials and practice tests.
              </p>

              {/* CTA Button */}
              <button className="hero-cta-btn d-inline-flex align-items-center">
                Start Learning Now
                <ArrowRight size={18} className="ms-2" />
              </button>
            </div>

            {/* Stats Section */}
            <div className="row g-4 justify-content-center">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;

                return (
                  <div key={index} className="col-sm-6 col-md-4">
                    <div className="stat-card text-center p-4">
                      <div className="mb-3">
                        <div
                          style={{
                            background: '#6366f1',
                            borderRadius: '12px',
                            padding: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <IconComponent size={24} color="white" />
                        </div>
                      </div>

                      <div
                        className="h3 fw-bold mb-2"
                        style={{ color: '#6366f1' }}
                      >
                        {stat.value}{stat.suffix}
                      </div>
                      <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;