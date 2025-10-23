import { useState, useEffect, memo } from 'react';
import { Star, Download, Users, ArrowRight, Rocket, Shield, Award } from 'lucide-react';

// Constants
const DEFAULT_BUNDLES = [
  { id: 1, name: 'Complete JEE Prep', price: 2999, rating: 4.8, description: 'All-in-one JEE Main & Advanced preparation materials' },
  { id: 2, name: 'NEET Master Bundle', price: 2499, rating: 4.6, description: 'Comprehensive NEET biology, chemistry, and physics' },
  { id: 3, name: 'Board Exam Elite', price: 1999, rating: 4.5, description: 'Complete CBSE/ICSE board exam preparation' }
];

const ICONS = [Rocket, Shield, Award];
const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
];

const FeaturedBundles = memo(({ bundles = DEFAULT_BUNDLES, onBundleClick = () => { }, loading = false }) => {
  const styles = `
    .title-glow { 
      letter-spacing: -0.02em;
      line-height: 1.2;
    }
    
    .featured-card {
      transition: all 0.3s ease;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }
    
    .featured-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 40px rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.4);
    }
    
    .featured-btn {
      transition: all 0.3s ease;
    }
    
    .featured-btn-primary:hover {
      background: #5855eb !important;
      transform: translateY(-2px);
    }
  `;

  if (loading) {
    return (
      <section style={{
        position: 'relative',
        minHeight: '50vh',
        background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: '#6366f1' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#cbd5e1' }}>Loading study materials...</p>
        </div>
      </section>
    );
  }

  // Use default bundles if no bundles are provided or if bundles array is empty
  const displayBundles = (bundles && bundles.length > 0) ? bundles : DEFAULT_BUNDLES;



  return (
    <section style={{
      background: 'linear-gradient(135deg, #0b0c10 0%, #1a1d29 100%)',
      padding: '4rem 0'
    }}>
      <style>{styles}</style>

      <div className="container">
        {/* Section Header */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2
              className="title-glow"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              course materials
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: '#e2e8f0',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.65',
              fontWeight: '400',
              opacity: '0.9'
            }}>
              Carefully curated study materials designed by experts to help you achieve academic excellence
            </p>
          </div>
        </div>

        {/* Simple Product Cards */}
        <div className="row g-4 mb-5">
          {displayBundles.slice(0, 3).map((bundle, index) => {
            const IconComponent = ICONS[index % ICONS.length];

            return (
              <div key={bundle.id || bundle._id} className="col-lg-4 col-md-6">
                <div
                  className="featured-card h-100"
                  style={{
                    background: 'rgba(15, 20, 40, 0.9)',
                    borderRadius: '16px',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'white',
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    padding: '2rem'
                  }}
                >
                  {/* Icon */}
                  <div className="text-center mb-3">
                    <div
                      className="d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: '60px',
                        height: '60px',
                        background: '#6366f1',
                        borderRadius: '12px'
                      }}
                    >
                      <IconComponent size={28} color="white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h5 className="text-center fw-bold mb-3" style={{ color: 'white', fontSize: '1.25rem' }}>
                    {bundle.name || bundle.title || 'Study Bundle'}
                  </h5>

                  {/* Description */}
                  <p className="text-center mb-4" style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                    {bundle.description || 'Comprehensive study materials with practice questions.'}
                  </p>

                  {/* Price */}


                  {/* Rating */}
                  <div className="d-flex align-items-center justify-content-center mb-4">
                    <div className="d-flex me-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < Math.floor(bundle.rating || 4.5) ? 'text-warning' : 'text-white-50'}`}
                          fill={i < Math.floor(bundle.rating || 4.5) ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <small style={{ color: '#e2e8f0' }}>
                      {bundle.rating || '4.5'} ({100 + index * 50})
                    </small>
                  </div>

                  {/* Stats */}
                  <div className="d-flex justify-content-between mb-4" style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                    <div className="d-flex align-items-center">
                      <Users size={14} className="me-1" style={{ color: '#6366f1' }} />
                      {700 + index * 200}+ Students
                    </div>
                    <div className="d-flex align-items-center">
                      <Download size={14} className="me-1" style={{ color: '#6366f1' }} />
                      {500 + index * 100}+
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    className="btn w-100 featured-btn featured-btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBundleClick(bundle);
                    }}
                    style={{
                      background: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px',
                      fontWeight: '600'
                    }}
                  >
                    <ArrowRight size={16} className="me-2" />
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

FeaturedBundles.displayName = 'FeaturedBundles';

export default FeaturedBundles;
