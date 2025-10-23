import { useState, useEffect, useCallback, memo } from 'react';
import { Search, Filter, BookOpen, Download, Users, Sparkles, TrendingUp } from 'lucide-react';

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

const StudyMaterialsHero = memo(({
  searchTerm,
  onSearchChange,
  onFilterClick,
  stats = { bundles: 150, downloads: 500, students: 250 }
}) => {
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

  const styles = `
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      50% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }

    @keyframes statFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    
    @keyframes searchGlow {
      0%, 100% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05); }
      50% { box-shadow: 0 12px 48px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1); }
    }
    
    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }

    .hero-title-glow { 
      animation: titleGlow 3s ease-in-out infinite;
      letter-spacing: -0.025em;
      line-height: 1.1;
    }

    .hero-stat-float { 
      animation: statFloat 4s ease-in-out infinite;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .hero-stat-float:nth-child(2) { animation-delay: -1.3s; }
    .hero-stat-float:nth-child(3) { animation-delay: -2.6s; }

    .search-container {
      background: rgba(15, 20, 40, 0.9);
      border: 1px solid rgba(99, 102, 241, 0.2);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .search-container:hover {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 12px 48px rgba(99, 102, 241, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
    
    .search-container:focus-within {
      border-color: rgba(99, 102, 241, 0.6);
      box-shadow: 0 16px 64px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      transform: translateY(-3px);
    }
    
    .search-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
      transition: left 0.6s ease;
    }
    
    .search-container:hover::before {
      left: 100%;
    }

    .search-input {
      background: transparent;
      border: none;
      color: #ffffff;
      font-size: 1.1rem;
      font-weight: 500;
      padding: 1.25rem 1.5rem;
      width: 100%;
      outline: none;
      letter-spacing: 0.025em;
    }
    
    .search-input::placeholder {
      color: rgba(226, 232, 240, 0.6);
      font-weight: 400;
    }
    
    .search-input:focus::placeholder {
      color: rgba(226, 232, 240, 0.4);
    }

    .search-icon {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.2) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 16px;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .search-icon:hover {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.3) 100%);
      border-color: rgba(99, 102, 241, 0.5);
      transform: scale(1.05);
    }

    .filter-btn {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #ffffff;
      font-weight: 600;
      padding: 1.25rem 2rem;
      border-radius: 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1rem;
      letter-spacing: 0.025em;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .filter-btn:hover {
      background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%);
      box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3);
      transform: translateY(-1px) scale(1.02);
      border-color: rgba(99, 102, 241, 0.5);
    }
    
    .filter-btn:active {
      transform: translateY(0) scale(1);
      transition: transform 0.1s ease;
    }

    .cta-btn {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #ffffff;
      font-weight: 700;
      padding: 1.25rem 3rem;
      border-radius: 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 1.1rem;
      letter-spacing: 0.025em;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.25);
      position: relative;
      overflow: hidden;
    }
    
    .cta-btn:hover {
      background: linear-gradient(135deg, #5855eb 0%, #7c3aed 100%);
      box-shadow: 0 12px 48px rgba(99, 102, 241, 0.4);
      transform: translateY(-3px) scale(1.05);
      border-color: rgba(99, 102, 241, 0.5);
    }
    
    .cta-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }
    
    .cta-btn:hover::before {
      left: 100%;
    }

    .stat-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    
    .stat-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 24px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .search-container {
        padding: 1rem !important;
      }
      
      .search-input {
        font-size: 1rem;
        padding: 1rem 1.25rem;
      }
      
      .filter-btn {
        padding: 1rem 1.5rem;
        font-size: 0.9rem;
      }
      
      .cta-btn {
        padding: 1rem 2rem;
        font-size: 1rem;
      }
      
      .stat-card {
        margin-bottom: 1rem;
      }
    }

    @media (max-width: 576px) {
      .search-container .d-flex {
        flex-direction: column;
        gap: 1rem !important;
      }
      
      .search-icon {
        display: none;
      }
      
      .filter-btn, .cta-btn {
        width: 100%;
        max-width: 280px;
        justify-content: center;
      }
      
      .search-suggestions {
        justify-content: center !important;
      }
    }
  `;

  return (
    <section
      className="position-relative overflow-hidden"
      style={{
        background: '#0b0c10',
        minHeight: '100vh',
        color: 'white',
        fontFamily: 'var(--bs-font-display)'
      }}
    >
      <style>{styles}</style>

      {/* Simplified Background */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(60px)'
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(80px)'
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
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Hero Section */}
        <div style={{ 
          minHeight: '80vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '3rem 0'
        }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 col-xl-9">
                {/* Main Title */}
                <div className="text-center mb-5">
                  <h1
                    className="hero-title-glow"
                    style={{
                      fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                      fontWeight: 'bold',
                      marginBottom: '1.5rem',
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.02em',
                      lineHeight: '1.1'
                    }}
                  >
                    Your Study Hub
                  </h1>
                  <p
                    style={{
                      fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
                      color: '#e2e8f0',
                      maxWidth: '700px',
                      margin: '0 auto 3rem',
                      fontWeight: '400',
                      lineHeight: '1.7',
                      opacity: '0.9'
                    }}
                  >
                    Access premium study materials, track your progress, and excel in your academic journey with cutting-edge resources
                  </p>
                </div>

                {/* Advanced Search Bar */}
                <div className="row justify-content-center mb-5">
                  <div className="col-lg-11 col-xl-10">
                    <div className="search-container p-2">
                      <div className="d-flex align-items-center gap-3">
                        {/* Search Icon */}
                        <div className="search-icon d-none d-sm-flex">
                          <Search size={22} style={{ color: '#6366f1' }} />
                        </div>

                        {/* Search Input */}
                        <div className="flex-grow-1">
                          <input
                            type="text"
                            className="search-input"
                            placeholder="Search for study materials, subjects, or topics..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                          />
                        </div>

                        {/* Filter Button */}
                        <button
                          className="filter-btn d-flex align-items-center"
                          onClick={onFilterClick}
                          aria-label="Open filters"
                        >
                          <Filter size={18} className="me-2" />
                          <span className="d-none d-sm-inline">Filters</span>
                        </button>
                      </div>

                      {/* Search Suggestions */}
                      <div className="d-flex flex-wrap gap-2 mt-3 px-3 search-suggestions">
                        <span style={{
                          color: 'rgba(226, 232, 240, 0.7)',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          marginRight: '0.5rem'
                        }}>
                          Popular:
                        </span>
                        {['JEE Main', 'NEET', 'Mathematics', 'Physics', 'Chemistry'].map((tag, index) => (
                          <button
                            key={index}
                            className="btn btn-sm"
                            onClick={() => onSearchChange(tag)}
                            style={{
                              background: 'rgba(99, 102, 241, 0.1)',
                              border: '1px solid rgba(99, 102, 241, 0.2)',
                              color: '#6366f1',
                              borderRadius: '16px',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.8rem',
                              fontWeight: '500',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)';
                              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{ padding: '3rem 0' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="row g-4 justify-content-center">
                  {[
                    { icon: BookOpen, value: stats.bundles, label: 'Study Bundles', suffix: '+' },
                    { icon: Download, value: stats.downloads, label: 'Downloads', suffix: 'K+' },
                    { icon: Users, value: stats.students, label: 'Active Students', suffix: 'K+' }
                  ].map((stat, index) => {
                    const IconComponent = stat.icon;
                    const gradients = [
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    ];

                    return (
                      <div key={index} className="col-sm-6 col-md-4">
                        <div className="stat-card hero-stat-float h-100 text-center position-relative p-4">
                          {/* Icon Background */}
                          <div
                            style={{
                              background: gradients[index],
                              borderRadius: '16px',
                              padding: '1.5rem',
                              marginBottom: '1.5rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: -15,
                                right: -15,
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.15)',
                                zIndex: 0,
                              }}
                            />
                            <IconComponent size={32} color="white" strokeWidth={1.5} style={{ position: 'relative', zIndex: 1 }} />
                          </div>

                          <div
                            className="h2 fw-bold mb-2"
                            style={{
                              color: '#6366f1',
                              fontSize: '2rem',
                              textShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
                            }}
                          >
                            {stat.value}{stat.suffix}
                          </div>
                          <div
                            style={{
                              fontWeight: '600',
                              color: '#e2e8f0',
                              fontSize: '0.95rem',
                              opacity: '0.9'
                            }}
                          >
                            {stat.label}
                          </div>

                          {/* Decorative Elements */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: -20,
                              left: -20,
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              background: 'rgba(99, 102, 241, 0.08)',
                              zIndex: 0,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div style={{ padding: '2rem 0 4rem' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="text-center">
                  <button className="cta-btn d-inline-flex align-items-center">
                    <Sparkles size={20} className="me-2" />
                    Explore All Materials
                    <TrendingUp size={18} className="ms-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

StudyMaterialsHero.displayName = 'StudyMaterialsHero';

export default StudyMaterialsHero;