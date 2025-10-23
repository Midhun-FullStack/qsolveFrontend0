import React, { useState, useEffect, memo } from 'react';
import { 
  BookOpen, Users, Award, Target, Mail, Phone, MapPin, Sparkles, 
  Shield, Rocket, TrendingUp, Star, CheckCircle, GraduationCap,
  Zap, Heart, Globe, Clock, ArrowRight, Building
} from 'lucide-react';

const AboutPageRedesigned = memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Study Materials',
      description: 'Access thousands of expertly curated question papers, notes, and practice materials across all engineering disciplines.',
      color: '#6366f1'
    },
    {
      icon: Shield,
      title: 'Quality Assured Content',
      description: 'All materials are reviewed by subject matter experts and updated regularly to ensure accuracy and relevance.',
      color: '#8b5cf6'
    },
    {
      icon: Users,
      title: 'Institutional Access',
      description: 'Seamless integration with educational institutions for organized access management and student progress tracking.',
      color: '#22c55e'
    },
    {
      icon: Target,
      title: 'Focused Learning',
      description: 'Targeted practice materials and structured content designed to maximize learning efficiency and exam preparation.',
      color: '#f59e0b'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Served', icon: Users, color: '#6366f1' },
    { number: '500+', label: 'Study Materials', icon: BookOpen, color: '#8b5cf6' },
    { number: '50+', label: 'Partner Institutions', icon: Building, color: '#22c55e' },
    { number: '99%', label: 'Student Satisfaction', icon: Heart, color: '#f59e0b' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #0f1419 100%)',
      minHeight: '100vh',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: 0 }}>
        <div 
          className="position-absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '10%',
            right: '5%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Mouse Follow Glow */}
      <div
        className="position-fixed"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      <div className="position-relative" style={{ zIndex: 2 }}>
        {/* Hero Section */}
        <section className="py-5" style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-10">
                <div className="mb-4">
                  <span 
                    className="badge px-4 py-2 mb-4"
                    style={{
                      background: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc',
                      fontSize: '1rem',
                      fontWeight: '600',
                      borderRadius: '25px',
                      border: '1px solid rgba(99, 102, 241, 0.3)'
                    }}
                  >
                    <Sparkles size={18} className="me-2" />
                    About Q SOLVE
                  </span>
                </div>
                
                <h1 
                  className="mb-4"
                  style={{
                    fontSize: 'clamp(3rem, 8vw, 5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                    textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Empowering Student Success
                </h1>
                
                <p 
                  className="lead mb-5"
                  style={{
                    fontSize: '1.3rem',
                    color: '#cbd5e1',
                    maxWidth: '800px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.7',
                    fontWeight: '400'
                  }}
                >
                  Your trusted partner in academic excellence, providing comprehensive study materials 
                  and resources to help engineering students achieve their educational goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-5">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6">
                <div 
                  className="p-5 h-100 rounded-4"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="d-flex align-items-center justify-content-center me-4"
                      style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      <Rocket size={32} color="white" />
                    </div>
                    <h3 className="mb-0 fw-bold" style={{ color: '#ffffff', fontSize: '2rem' }}>
                      Our Mission
                    </h3>
                  </div>
                  
                  <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    To democratize access to high-quality educational resources and empower engineering 
                    students with the tools they need to excel in their academic journey and beyond.
                  </p>
                  
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
                    We believe that every student deserves access to comprehensive, well-structured 
                    study materials that can help them understand complex concepts and prepare 
                    effectively for their examinations.
                  </p>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div 
                  className="p-5 h-100 rounded-4"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div className="d-flex align-items-center mb-4">
                    <div 
                      className="d-flex align-items-center justify-content-center me-4"
                      style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        borderRadius: '16px',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <Target size={32} color="white" />
                    </div>
                    <h3 className="mb-0 fw-bold" style={{ color: '#ffffff', fontSize: '2rem' }}>
                      Our Vision
                    </h3>
                  </div>
                  
                  <p style={{ color: '#e2e8f0', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    To become the leading educational platform that transforms how students learn, 
                    practice, and achieve academic excellence in engineering education.
                  </p>
                  
                  <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6' }}>
                    We envision a future where geographical and economic barriers don't limit 
                    access to quality education, and where every student has the opportunity 
                    to reach their full potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-5">
          <div className="container">
            <div className="text-center mb-5">
              <h2 
                className="mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: '700',
                  color: '#ffffff'
                }}
              >
                Why Choose Q SOLVE?
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                Discover what makes our platform the perfect choice for your academic success
              </p>
            </div>

            <div className="row g-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                
                return (
                  <div key={index} className="col-lg-6 col-md-6">
                    <div 
                      className="p-4 h-100 rounded-4"
                      style={{
                        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        transition: 'all 0.4s ease'
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <div 
                          className="d-flex align-items-center justify-content-center me-4 flex-shrink-0"
                          style={{
                            width: '64px',
                            height: '64px',
                            background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                            borderRadius: '16px',
                            boxShadow: `0 8px 24px ${feature.color}30`
                          }}
                        >
                          <IconComponent size={28} color="white" />
                        </div>
                        
                        <div className="flex-grow-1">
                          <h4 className="mb-3 fw-bold" style={{ color: '#ffffff', fontSize: '1.3rem' }}>
                            {feature.title}
                          </h4>
                          
                          <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-5">
          <div className="container">
            <div 
              className="p-5 rounded-4 text-center"
              style={{
                background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h2 className="mb-5 fw-bold" style={{ color: '#ffffff', fontSize: '2.5rem' }}>
                Our Impact in Numbers
              </h2>
              
              <div className="row g-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  
                  return (
                    <div key={index} className="col-lg-3 col-md-6">
                      <div className="text-center">
                        <div 
                          className="d-inline-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: '80px',
                            height: '80px',
                            background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                            borderRadius: '20px',
                            boxShadow: `0 12px 24px ${stat.color}30`
                          }}
                        >
                          <IconComponent size={36} color="white" />
                        </div>
                        
                        <div 
                          className="h2 fw-bold mb-2"
                          style={{ color: '#ffffff', fontSize: '2.5rem' }}
                        >
                          {stat.number}
                        </div>
                        
                        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-5">
          <div className="container">
            <div 
              className="p-5 rounded-4 text-center"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h2 className="mb-4 fw-bold" style={{ color: '#ffffff', fontSize: '2.5rem' }}>
                Get in Touch
              </h2>
              <p className="mb-5" style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                Have questions or need support? We're here to help you succeed.
              </p>

              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        borderRadius: '20px',
                        boxShadow: '0 12px 24px rgba(99, 102, 241, 0.3)'
                      }}
                    >
                      <Mail size={36} color="white" />
                    </div>
                    <h5 className="mb-2 fw-bold" style={{ color: '#ffffff' }}>Email Us</h5>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>support@qsolve.edu</p>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6">
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        borderRadius: '20px',
                        boxShadow: '0 12px 24px rgba(139, 92, 246, 0.3)'
                      }}
                    >
                      <Phone size={36} color="white" />
                    </div>
                    <h5 className="mb-2 fw-bold" style={{ color: '#ffffff' }}>Call Us</h5>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6">
                  <div className="text-center">
                    <div 
                      className="d-inline-flex align-items-center justify-content-center mb-3"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        boxShadow: '0 12px 24px rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <MapPin size={36} color="white" />
                    </div>
                    <h5 className="mb-2 fw-bold" style={{ color: '#ffffff' }}>Visit Us</h5>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>Bangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <button
                  className="btn px-5 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    border: 'none',
                    color: '#ffffff',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  <Mail size={20} className="me-2" />
                  Contact Support
                  <ArrowRight size={18} className="ms-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
});

AboutPageRedesigned.displayName = 'AboutPageRedesigned';

export default AboutPageRedesigned;