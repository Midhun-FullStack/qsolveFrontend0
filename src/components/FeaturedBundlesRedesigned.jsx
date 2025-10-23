import React, { useState, useEffect, memo } from 'react';
import { 
  Star, Download, Users, ArrowRight, BookOpen, GraduationCap, 
  TrendingUp, Award, Zap, Target, Shield, Heart, Eye,
  Clock, CheckCircle, Sparkles, ChevronRight
} from 'lucide-react';

// Enhanced default bundles with more realistic data
const DEFAULT_BUNDLES = [
  { 
    id: 1, 
    name: 'JEE Main Complete Package', 
    rating: 4.8, 
    description: 'Comprehensive JEE Main preparation with 5000+ practice questions, detailed solutions, and expert video explanations.',
    category: 'Engineering',
    materials: 25,
    students: 1250,
    difficulty: 'Advanced',
    featured: true
  },
  { 
    id: 2, 
    name: 'NEET Biology Mastery', 
    rating: 4.6, 
    description: 'Complete biology preparation for NEET with detailed notes, diagrams, and practice questions.',
    category: 'Medical',
    materials: 18,
    students: 890,
    difficulty: 'Intermediate',
    featured: true
  },
  { 
    id: 3, 
    name: 'Mathematics Fundamentals', 
    rating: 4.5, 
    description: 'Essential mathematics concepts with step-by-step solutions and practice problems.',
    category: 'Mathematics',
    materials: 22,
    students: 2100,
    difficulty: 'Beginner',
    featured: false
  }
];

const CATEGORY_ICONS = {
  'Engineering': Zap,
  'Medical': Shield,
  'Mathematics': Target,
  'Science': Award,
  'Commerce': TrendingUp,
  'Default': BookOpen
};

const CATEGORY_COLORS = {
  'Engineering': '#6366f1',
  'Medical': '#ef4444',
  'Mathematics': '#8b5cf6',
  'Science': '#22c55e',
  'Commerce': '#f59e0b',
  'Default': '#6366f1'
};

const DIFFICULTY_COLORS = {
  'Beginner': '#22c55e',
  'Intermediate': '#f59e0b',
  'Advanced': '#ef4444'
};

const FeaturedBundlesRedesigned = memo(({ bundles = DEFAULT_BUNDLES, onBundleClick = () => {}, loading = false }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Use default bundles if no bundles are provided or if bundles array is empty
  const displayBundles = (bundles && bundles.length > 0) ? bundles : DEFAULT_BUNDLES;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (loading) {
    return (
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #0f1419 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 0'
      }}>
        <div className="text-center">
          <div className="d-flex justify-content-center mb-4">
            <div className="spinner-border" style={{ 
              color: '#6366f1', 
              width: '3rem', 
              height: '3rem',
              borderWidth: '3px'
            }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h4 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Loading Study Materials</h4>
          <p style={{ color: '#94a3b8' }}>Preparing the best content for you...</p>
        </div>
      </section>
    );
  }

  const BundleCard = ({ bundle, index }) => {
    const IconComponent = CATEGORY_ICONS[bundle.category] || CATEGORY_ICONS.Default;
    const categoryColor = CATEGORY_COLORS[bundle.category] || CATEGORY_COLORS.Default;
    const difficultyColor = DIFFICULTY_COLORS[bundle.difficulty] || DIFFICULTY_COLORS.Intermediate;
    const isHovered = hoveredCard === index;

    return (
      <div className="col-lg-4 col-md-6 mb-4">
        <div
          className="bundle-card h-100 position-relative"
          style={{
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '0',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
            overflow: 'hidden',
            transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: isHovered 
              ? `0 25px 50px ${categoryColor}25, 0 0 0 1px ${categoryColor}40`
              : '0 8px 25px rgba(0, 0, 0, 0.15)',
            borderColor: isHovered ? `${categoryColor}40` : 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => onBundleClick(bundle)}
        >
          {/* Featured Badge */}
          {bundle.featured && (
            <div 
              className="position-absolute"
              style={{
                top: '16px',
                right: '16px',
                zIndex: 3,
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#0f1419',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Sparkles size={12} className="me-1" />
              Featured
            </div>
          )}

          {/* Header Section */}
          <div className="p-4 pb-3">
            <div className="d-flex align-items-center mb-3">
              <div 
                className="d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '56px',
                  height: '56px',
                  background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`,
                  borderRadius: '16px',
                  boxShadow: `0 8px 16px ${categoryColor}30`,
                  transition: 'all 0.3s ease'
                }}
              >
                <IconComponent size={28} color="white" />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span 
                    className="badge px-2 py-1"
                    style={{
                      background: `${categoryColor}20`,
                      color: categoryColor,
                      fontSize: '0.7rem',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}
                  >
                    {bundle.category}
                  </span>
                  <span 
                    className="badge px-2 py-1"
                    style={{
                      background: `${difficultyColor}20`,
                      color: difficultyColor,
                      fontSize: '0.7rem',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}
                  >
                    {bundle.difficulty}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex me-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${i < Math.floor(bundle.rating) ? 'text-warning' : 'text-white-50'}`}
                        fill={i < Math.floor(bundle.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    {bundle.rating} ({bundle.students || Math.floor(Math.random() * 500) + 100})
                  </small>
                </div>
              </div>
            </div>

            <h4 className="mb-3 fw-bold" style={{ 
              color: '#ffffff', 
              fontSize: '1.3rem',
              lineHeight: '1.3',
              letterSpacing: '-0.01em'
            }}>
              {bundle.name || bundle.title}
            </h4>

            <p className="mb-4" style={{ 
              color: '#cbd5e1', 
              fontSize: '0.95rem', 
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              {bundle.description || 'Comprehensive study materials with practice questions, detailed solutions, and expert guidance.'}
            </p>

            {/* Stats Row */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center gap-4" style={{ fontSize: '0.85rem' }}>
                <div className="d-flex align-items-center">
                  <BookOpen size={14} className="me-2" style={{ color: categoryColor }} />
                  <span style={{ color: '#e2e8f0', fontWeight: '500' }}>
                    {bundle.materials || Math.floor(Math.random() * 30) + 10} Materials
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <Users size={14} className="me-2" style={{ color: categoryColor }} />
                  <span style={{ color: '#e2e8f0', fontWeight: '500' }}>
                    {bundle.students || Math.floor(Math.random() * 1000) + 500}
                  </span>
                </div>
              </div>
              
              {/* Access Badge - No Price */}
              <div 
                className="badge px-3 py-2"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }}
              >
                Institutional Access
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div 
            className="p-4 pt-0"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <button
              className="btn w-100 d-flex align-items-center justify-content-center"
              style={{
                background: isHovered 
                  ? `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}dd 100%)`
                  : 'rgba(255, 255, 255, 0.1)',
                border: `1px solid ${isHovered ? categoryColor : 'rgba(255, 255, 255, 0.2)'}`,
                color: isHovered ? '#ffffff' : '#e2e8f0',
                borderRadius: '12px',
                padding: '12px 16px',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: isHovered ? `0 4px 12px ${categoryColor}30` : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onBundleClick(bundle);
              }}
            >
              <Eye size={18} className="me-2" />
              Explore Bundle
              <ChevronRight size={16} className="ms-2" />
            </button>
          </div>

          {/* Hover Glow Effect */}
          {isHovered && (
            <div 
              className="position-absolute"
              style={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 50%, ${categoryColor}15 0%, transparent 70%)`,
                borderRadius: '20px',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0f1419 0%, #1a1d29 50%, #0f1419 100%)',
      padding: '5rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: 0 }}>
        <div 
          className="position-absolute"
          style={{
            top: '20%',
            left: '10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="position-absolute"
          style={{
            bottom: '20%',
            right: '10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Mouse Follow Glow */}
      <div
        className="position-fixed"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          transition: 'left 0.1s ease-out, top 0.1s ease-out'
        }}
      />

      <div className="container position-relative" style={{ zIndex: 2 }}>
        {/* Enhanced Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <div className="mb-4">
              <span 
                className="badge px-4 py-2 mb-3"
                style={{
                  background: 'rgba(99, 102, 241, 0.2)',
                  color: '#a5b4fc',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  borderRadius: '25px',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}
              >
                <Sparkles size={16} className="me-2" />
                Featured Study Materials
              </span>
            </div>
            
            <h2
              className="title-glow mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}
            >
              Premium Course Materials
            </h2>
            
            <p style={{
              fontSize: '1.2rem',
              color: '#cbd5e1',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.7',
              fontWeight: '400',
              opacity: '0.9'
            }}>
              Expertly curated study materials designed to accelerate your learning journey and help you achieve academic excellence
            </p>
          </div>
        </div>

        {/* Enhanced Bundle Cards */}
        <div className="row g-4 mb-5">
          {displayBundles.slice(0, 3).map((bundle, index) => (
            <BundleCard key={bundle.id || bundle._id || index} bundle={bundle} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-12 text-center">
            <div 
              className="p-5 rounded-4"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <h4 className="mb-3 fw-bold" style={{ color: '#ffffff' }}>
                Ready to Start Learning?
              </h4>
              <p className="mb-4" style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
                Join thousands of students who are already excelling with our study materials
              </p>
              <button
                className="btn px-5 py-3"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 24px rgba(99, 102, 241, 0.3)';
                }}
              >
                <GraduationCap size={20} className="me-2" />
                Browse All Materials
                <ArrowRight size={18} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .bundle-card {
          will-change: transform;
        }
        
        .title-glow {
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
});

FeaturedBundlesRedesigned.displayName = 'FeaturedBundlesRedesigned';

export default FeaturedBundlesRedesigned;