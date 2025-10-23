import { useEffect, useState, useCallback, memo } from 'react';
import { BookOpen, Users, Award, Target, Mail, Phone, MapPin, Sparkles, Shield, Rocket, TrendingUp, Star } from 'lucide-react';

// Simplified throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const AboutPage = memo(() => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Throttled mouse move for better performance
  const throttledMouseMove = useCallback(
    throttle((e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    window.addEventListener('mousemove', throttledMouseMove);
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [throttledMouseMove]);

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access thousands of question papers across multiple engineering disciplines',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: Users,
      title: 'Expert Curated',
      description: 'All content is reviewed and curated by subject matter experts',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'High-quality materials that help you excel in your studies',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: Target,
      title: 'Focused Learning',
      description: 'Targeted practice materials for better exam preparation',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const stats = [
    { number: '500+', label: 'Study Materials', icon: BookOpen },
    { number: '10K+', label: 'Students Helped', icon: Users },
    { number: '25K+', label: 'Downloads', icon: TrendingUp },
    { number: '99%', label: 'Success Rate', icon: Award }
  ];

  const styles = `
    @keyframes floatBlob1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-30px, 50px) scale(0.9); }
    }

    @keyframes floatBlob2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-40px, 30px) scale(0.9); }
      66% { transform: translate(40px, -40px) scale(1.1); }
    }

    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      50% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }

    @keyframes cardFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }

    @keyframes pulse {
      0%, 100% { r: 6; opacity: 1; }
      50% { r: 12; opacity: 0; }
    }

    .blob-1 {
      animation: floatBlob1 8s ease-in-out infinite;
    }

    .blob-2 {
      animation: floatBlob2 10s ease-in-out infinite;
    }

    .title-glow {
      animation: titleGlow 3s ease-in-out infinite;
    }

    .card-float {
      animation: cardFloat 4s ease-in-out infinite;
    }

    .card-float:nth-child(2) { animation-delay: -1s; }
    .card-float:nth-child(3) { animation-delay: -2s; }
    .card-float:nth-child(4) { animation-delay: -3s; }

    .about-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .about-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 24px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }

    .about-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent);
    }

    .feature-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .feature-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 48px rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.25);
    }

    .stats-card {
      background: rgba(15, 20, 40, 0.9);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 12px 48px rgba(99, 102, 241, 0.15);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .contact-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .contact-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 40px rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.25);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .about-card, .feature-card {
        margin-bottom: 1.5rem;
      }
    }
  `;

  return (
    <div style={{ 
      position: 'relative',
      minHeight: '100vh',
      background: '#0b0c10',
      overflow: 'hidden',
      color: '#ffffff',
      fontFamily: 'var(--bs-font-display)'
    }}>
      <style>{styles}</style>

      {/* Enhanced Background Effects */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(80px)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(100px)'
        }}
      />

      {/* Floating Elements */}
      <div
        className="blob-1"
        style={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.3) 100%)',
          zIndex: 1,
          filter: 'blur(1px)'
        }}
      />

      <div
        className="blob-2"
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.35) 100%)',
          zIndex: 1,
          filter: 'blur(1px)'
        }}
      />

      {/* Cursor Glow Effect */}
      <div
        style={{
          position: 'fixed',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          left: mousePos.x - 200,
          top: mousePos.y - 200,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '6rem 0' }}>
        {/* Hero Section */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-6">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <Sparkles size={40} style={{ color: '#6366f1', marginRight: '1rem' }} />
                  <h1
                    className="title-glow"
                    style={{
                      fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                      fontWeight: 'bold',
                      margin: 0,
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    About Q SOLVE
                  </h1>
                  <Star size={40} style={{ color: '#8b5cf6', marginLeft: '1rem' }} />
                </div>
                <p style={{
                  fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                  color: '#cbd5e1',
                  maxWidth: '800px',
                  margin: '0 auto',
                  fontWeight: '500',
                  lineHeight: '1.8',
                  opacity: '0.9'
                }}>
                  Your trusted partner in academic excellence and engineering education
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* Mission & Vision Section */}
          <div className="row g-4 mb-6">
            <div className="col-lg-6">
              <div className="about-card h-100 p-4">
                <div style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'rgba(99, 102, 241, 0.1)',
                  zIndex: 0,
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="d-flex align-items-center mb-4">
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.3) 100%)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginRight: '1rem',
                      border: '1px solid rgba(99, 102, 241, 0.2)',
                      boxShadow: '0 8px 24px rgba(99, 102, 241, 0.15)'
                    }}>
                      <Rocket size={32} style={{ color: '#6366f1' }} />
                    </div>
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      Our Mission
                    </h3>
                  </div>
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.7',
                    marginBottom: '1rem',
                    opacity: '0.9'
                  }}>
                    Q Solve is dedicated to empowering engineering students with comprehensive, 
                    high-quality question papers and study materials. We believe that access to 
                    the right resources at the right time can make all the difference in a 
                    student's academic journey.
                  </p>
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.7',
                    opacity: '0.9'
                  }}>
                    Our platform bridges the gap between theoretical knowledge and practical 
                    application, helping students prepare effectively for their examinations 
                    and build a strong foundation for their careers.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="about-card h-100 p-4">
                <div style={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'rgba(139, 92, 246, 0.1)',
                  zIndex: 0,
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div className="d-flex align-items-center mb-4">
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.3) 100%)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      marginRight: '1rem',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15)'
                    }}>
                      <Target size={32} style={{ color: '#8b5cf6' }} />
                    </div>
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      margin: 0
                    }}>
                      Our Vision
                    </h3>
                  </div>
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.7',
                    marginBottom: '1rem',
                    opacity: '0.9'
                  }}>
                    To become the leading educational platform that transforms how engineering 
                    students learn, practice, and excel in their academic pursuits. We envision 
                    a future where every student has access to quality educational resources 
                    regardless of their geographical or economic constraints.
                  </p>
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.7',
                    opacity: '0.9'
                  }}>
                    Through continuous innovation and commitment to excellence, we aim to 
                    contribute to the development of skilled engineers who will shape the 
                    future of technology and society.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="row justify-content-center mb-6">
            <div className="col-lg-11">
              <div className="text-center mb-5">
                <h2 style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#ffffff'
                }}>
                  Why Choose Q SOLVE
                </h2>
                <p style={{
                  fontSize: '1.1rem',
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  margin: '0 auto',
                  opacity: '0.8'
                }}>
                  Discover what makes our platform the perfect choice for your academic success
                </p>
              </div>

              <div className="row g-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  
                  return (
                    <div key={index} className="col-lg-3 col-md-6">
                      <div className={`feature-card card-float h-100 p-4 text-center`}>
                        {/* Icon Background */}
                        <div className="mb-4">
                          <div
                            style={{
                              background: feature.gradient,
                              borderRadius: '16px',
                              padding: '1.5rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                              position: 'relative'
                            }}
                          >
                            <div style={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              width: 30,
                              height: 30,
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.2)',
                              zIndex: 0,
                            }} />
                            <IconComponent size={28} color="white" strokeWidth={1.5} style={{ position: 'relative', zIndex: 1 }} />
                          </div>
                        </div>

                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '1.25rem',
                          fontWeight: 'bold',
                          marginBottom: '1rem'
                        }}>
                          {feature.title}
                        </h4>
                        <p style={{
                          color: '#cbd5e1',
                          lineHeight: '1.6',
                          fontSize: '0.95rem',
                          opacity: '0.9',
                          margin: 0
                        }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ marginBottom: '6rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #00ff7f, #00cc66)',
                borderRadius: '1rem',
                padding: '4rem 2rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: -100,
                right: -100,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 0,
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                  color: '#0b0c10',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  marginBottom: '3rem'
                }}>
                  Our Impact
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '2rem'
                }}>
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: '#0b0c10',
                        marginBottom: '0.5rem'
                      }}>
                        {stat.number}
                      </div>
                      <div style={{
                        color: '#0b0c10',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <div
              style={{
                background: 'rgba(15, 20, 40, 0.7)',
                border: '1px solid rgba(0, 255, 127, 0.2)',
                borderRadius: '1rem',
                padding: '4rem 2rem',
                backdropFilter: 'blur(10px)',
                textAlign: 'center'
              }}
            >
              <h3 style={{
                color: '#00ff7f',
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '3rem'
              }}>
                Get In Touch
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem'
              }}>
                <div>
                  <div style={{
                    color: '#00ff7f',
                    marginBottom: '1rem'
                  }}>
                    <Mail size={40} />
                  </div>
                  <h6 style={{
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Email Us
                  </h6>
                  <p style={{ color: '#cbd5e1' }}>support@qsolve.com</p>
                </div>
                <div>
                  <div style={{
                    color: '#00ff7f',
                    marginBottom: '1rem'
                  }}>
                    <Phone size={40} />
                  </div>
                  <h6 style={{
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Call Us
                  </h6>
                  <p style={{ color: '#cbd5e1' }}>+91 98765 43210</p>
                </div>
                <div>
                  <div style={{
                    color: '#00ff7f',
                    marginBottom: '1rem'
                  }}>
                    <MapPin size={40} />
                  </div>
                  <h6 style={{
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem'
                  }}>
                    Visit Us
                  </h6>
                  <p style={{ color: '#cbd5e1' }}>Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;