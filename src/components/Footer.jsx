import React, { memo, useState, useEffect, useCallback } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  BookOpen,
  Users,
  Award,
  Sparkles,
  ArrowUp,
  ExternalLink,
  Download,
  TrendingUp
} from 'lucide-react';

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

const Footer = memo(() => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = `
    @keyframes footerFloatBlob1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(15px, -20px) scale(1.05); }
      66% { transform: translate(-15px, 20px) scale(0.95); }
    }

    @keyframes footerFloatBlob2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(-20px, 15px) scale(0.95); }
      66% { transform: translate(20px, -15px) scale(1.05); }
    }

    @keyframes footerPulse {
      0%, 100% { r: 3; opacity: 0.8; }
      50% { r: 6; opacity: 0.4; }
    }

    @keyframes footerGridFlow {
      0% { transform: translateY(0); }
      100% { transform: translateY(40px); }
    }

    @keyframes footerGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      50% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }

    @keyframes statFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }

    .footer-blob-1 {
      animation: footerFloatBlob1 8s ease-in-out infinite;
    }

    .footer-blob-2 {
      animation: footerFloatBlob2 10s ease-in-out infinite;
    }

    .footer-pulse {
      animation: footerPulse 3s ease-in-out infinite;
    }

    .footer-grid {
      animation: footerGridFlow 12s linear infinite;
    }

    .footer-glow {
      animation: footerGlow 4s ease-in-out infinite;
    }

    .footer-stat-float {
      animation: statFloat 4s ease-in-out infinite;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .footer-stat-float:nth-child(2) { animation-delay: -1s; }
    .footer-stat-float:nth-child(3) { animation-delay: -2s; }
    .footer-stat-float:nth-child(4) { animation-delay: -3s; }

    .footer-link {
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      padding: 0.5rem 0;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    .footer-link:hover {
      color: #6366f1;
      transform: translateX(8px);
      background: rgba(99, 102, 241, 0.05);
      padding-left: 1rem;
    }

    .footer-link::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #6366f1, #8b5cf6);
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    .footer-link:hover::before {
      transform: scaleY(1);
    }

    .social-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      color: #6366f1;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .social-link:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.25) 100%);
      transform: translateY(-3px) scale(1.05);
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.2);
    }

    .newsletter-input {
      flex: 1;
      padding: 1rem 1.25rem;
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.2);
      border-radius: 12px 0 0 12px;
      color: #ffffff;
      outline: none;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .newsletter-input:focus {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }

    .newsletter-input::placeholder {
      color: rgba(203, 213, 225, 0.6);
    }

    .newsletter-btn {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 0 12px 12px 0;
      color: #ffffff;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 0.95rem;
      position: relative;
      overflow: hidden;
    }

    .newsletter-btn:hover {
      background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
    }

    .newsletter-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }

    .newsletter-btn:hover::before {
      left: 100%;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .footer-link:hover {
        transform: translateX(4px);
        padding-left: 0.5rem;
      }
      
      .social-link {
        width: 40px;
        height: 40px;
      }
      
      .newsletter-input, .newsletter-btn {
        padding: 0.875rem 1rem;
        font-size: 0.9rem;
      }
    }
  `;

  const quickLinks = [
    { name: 'Study Materials', href: '/study-materials' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'FAQ', href: '/faq' }
  ];

  const subjects = [
    { name: 'Mathematics', href: '/subjects/mathematics' },
    { name: 'Physics', href: '/subjects/physics' },
    { name: 'Chemistry', href: '/subjects/chemistry' },
    { name: 'Biology', href: '/subjects/biology' },
    { name: 'Engineering', href: '/subjects/engineering' },
    { name: 'Computer Science', href: '/subjects/computer-science' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ];

  const stats = [
    { icon: BookOpen, value: '500+', label: 'Study Materials' },
    { icon: Users, value: '10K+', label: 'Students' },
    { icon: Download, value: '25K+', label: 'Downloads' },
    { icon: Award, value: '99%', label: 'Success Rate' }
  ];

  return (
    <footer style={{
      position: 'relative',
      background: '#0b0c10',
      color: '#ffffff',
      overflow: 'hidden',
      marginTop: 'auto'
    }}>
      <style>{styles}</style>

      {/* Animated SVG Background */}
      <svg
        viewBox="0 0 1400 400"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      >
        <defs>
          <radialGradient id="footerGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="footerGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.12 }} />
            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Simplified Grid */}
        <g className="footer-grid" opacity="0.03" stroke="#6366f1" strokeWidth="1">
          {[...Array(5)].map((_, i) => (
            <line key={`v${i}`} x1={i * 280} y1="0" x2={i * 280} y2="400" />
          ))}
          {[...Array(3)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 133} x2="1400" y2={i * 133} />
          ))}
        </g>

        {/* Floating Blobs */}
        <g className="footer-blob-1">
          <circle cx="200" cy="150" r="60" fill="url(#footerGlow1)" />
        </g>
        <g className="footer-blob-2">
          <circle cx="1200" cy="250" r="80" fill="url(#footerGlow2)" />
        </g>

        {/* Pulsing Nodes */}
        <g>
          <circle cx="400" cy="100" r="2" fill="#6366f1" opacity="0.6" />
          <circle cx="400" cy="100" r="2" fill="none" stroke="#6366f1" strokeWidth="1" className="footer-pulse" />
        </g>
        <g>
          <circle cx="1000" cy="300" r="2" fill="#8b5cf6" opacity="0.6" />
          <circle cx="1000" cy="300" r="2" fill="none" stroke="#8b5cf6" strokeWidth="1" className="footer-pulse" />
        </g>
      </svg>

      {/* Cursor Glow Effect */}
      <div
        style={{
          position: 'fixed',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      {/* Main Footer Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Stats Section */}
        <div style={{
          background: 'rgba(15, 20, 40, 0.8)',
          borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '4rem 0'
        }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="text-center mb-5">
                  <h2 style={{
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: '#ffffff',
                    marginBottom: '1rem'
                  }}>
                    Trusted by Students Worldwide
                  </h2>
                  <p style={{
                    fontSize: '1.1rem',
                    color: '#cbd5e1',
                    opacity: '0.8',
                    maxWidth: '600px',
                    margin: '0 auto'
                  }}>
                    Join thousands of students who have achieved academic success with our platform
                  </p>
                </div>
                
                <div className="row g-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    const gradients = [
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                    ];

                    return (
                      <div key={index} className="col-lg-3 col-md-6">
                        <div className="footer-stat-float text-center" style={{
                          padding: '2rem 1.5rem',
                          borderRadius: '20px',
                          background: 'rgba(15, 20, 40, 0.8)',
                          border: '1px solid rgba(99, 102, 241, 0.15)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                          e.currentTarget.style.boxShadow = '0 20px 48px rgba(99, 102, 241, 0.2)';
                          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.15)';
                        }}
                        >
                          {/* Icon Background */}
                          <div style={{
                            background: gradients[index],
                            borderRadius: '16px',
                            padding: '1.25rem',
                            marginBottom: '1.5rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                          }}>
                            <IconComponent size={28} color="white" strokeWidth={1.5} />
                          </div>

                          <div style={{
                            fontSize: '1.75rem',
                            fontWeight: 'bold',
                            color: '#6366f1',
                            marginBottom: '0.5rem',
                            textShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                          }}>
                            {stat.value}
                          </div>
                          <div style={{ 
                            color: '#e2e8f0', 
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            opacity: '0.9'
                          }}>
                            {stat.label}
                          </div>

                          {/* Decorative Element */}
                          <div style={{
                            position: 'absolute',
                            bottom: -15,
                            right: -15,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'rgba(99, 102, 241, 0.08)',
                            zIndex: 0,
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div style={{ padding: '4rem 0 2rem' }}>
          <div className="container">
            <div className="row g-4">
              {/* Brand Section */}
              <div className="col-lg-4">
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <Sparkles size={28} style={{ color: '#6366f1', marginRight: '0.75rem' }} />
                    <h3 className="footer-glow" style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      margin: 0
                    }}>
                      Q SOLVE
                    </h3>
                  </div>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                  }}>
                    Your gateway to academic excellence. Access premium study materials, 
                    expert guidance, and comprehensive resources to achieve your educational goals.
                  </p>
                  
                  {/* Contact Info */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-3" style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)' }}>
                      <Mail size={18} style={{ color: '#6366f1', marginRight: '1rem' }} />
                      <span style={{ color: '#e2e8f0', fontWeight: '500' }}>support@qsolve.com</span>
                    </div>
                    <div className="d-flex align-items-center mb-3" style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)' }}>
                      <Phone size={18} style={{ color: '#6366f1', marginRight: '1rem' }} />
                      <span style={{ color: '#e2e8f0', fontWeight: '500' }}>+91 98765 43210</span>
                    </div>
                    <div className="d-flex align-items-center" style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.05)' }}>
                      <MapPin size={18} style={{ color: '#6366f1', marginRight: '1rem' }} />
                      <span style={{ color: '#e2e8f0', fontWeight: '500' }}>Bangalore, Karnataka, India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-2 col-md-6">
                <h5 style={{
                  color: '#6366f1',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  Quick Links
                </h5>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {quickLinks.map((link, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <a
                        href={link.href}
                        className="footer-link"
                      >
                        {link.name}
                        <ExternalLink size={14} style={{ marginLeft: '0.5rem', opacity: 0.6 }} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subjects */}
              <div className="col-lg-2 col-md-6">
                <h5 style={{
                  color: '#6366f1',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  Subjects
                </h5>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {subjects.map((subject, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <a
                        href={subject.href}
                        className="footer-link"
                      >
                        {subject.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter & Social */}
              <div className="col-lg-4">
                <h5 style={{
                  color: '#6366f1',
                  fontWeight: 'bold',
                  marginBottom: '2rem',
                  fontSize: '1.1rem'
                }}>
                  Stay Connected
                </h5>
                
                {/* Newsletter */}
                <div className="mb-4">
                  <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Subscribe to get updates on new study materials and features.
                  </p>
                  <div className="d-flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="newsletter-input"
                    />
                    <button className="newsletter-btn">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p style={{ color: '#cbd5e1', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Follow us on social media
                  </p>
                  <div className="d-flex gap-3 flex-wrap">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.href}
                          aria-label={social.name}
                          className="social-link"
                        >
                          <IconComponent size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '2rem 0',
          background: 'rgba(15, 20, 40, 0.8)'
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-8">
                <div className="d-flex align-items-center flex-wrap gap-3">
                  <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem' }}>
                    © 2024 Q SOLVE. All rights reserved.
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Built with</span>
                    <span style={{ color: '#ef4444', fontSize: '1.2rem' }}>❤️</span>
                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>for students</span>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <div className="d-flex align-items-center justify-content-md-end gap-3">
                  <button
                    onClick={scrollToTop}
                    style={{
                      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6366f1',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%)';
                      e.target.style.transform = 'translateY(-3px) scale(1.05)';
                      e.target.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.2)';
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = 'none';
                    }}
                    aria-label="Scroll to top"
                  >
                    <ArrowUp size={22} />
                  </button>
                  
                  <div className="d-flex align-items-center gap-2">
                    <TrendingUp size={16} style={{ color: '#6366f1' }} />
                    <span style={{ color: '#6366f1', fontSize: '0.9rem', fontWeight: '600' }}>
                      Back to Top
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;