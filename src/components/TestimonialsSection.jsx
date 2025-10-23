import { useState, useEffect, useCallback, memo } from 'react';
import { Star, Quote, Sparkles, Users, Award } from 'lucide-react';

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

const TestimonialsSection = memo(() => {
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

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Medical Student",
      rating: 5,
      text: "The Premium Study Bundles transformed my exam preparation. The detailed solutions and expert guidance helped me score 95% in my finals!",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      featured: true,
      achievement: "95% Score"
    },
    {
      id: 2,
      name: "Rohan Patel",
      role: "Engineering Student",
      rating: 5,
      text: "Comprehensive materials with real exam questions. Worth every rupee. I recommended this to all my classmates and they loved it too.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
      achievement: "JEE Advanced"
    },
    {
      id: 3,
      name: "Anya Desai",
      role: "Law Student",
      rating: 4.5,
      text: "Exceptional quality study materials. The practice questions are challenging yet educational. Highly recommended for serious learners.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anya",
      achievement: "CLAT Qualified"
    },
    {
      id: 4,
      name: "Arjun Kumar",
      role: "Commerce Student",
      rating: 5,
      text: "Amazing platform with well-structured content. The study materials are comprehensive and easy to understand. Highly recommend!",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      achievement: "CA Foundation"
    },
    {
      id: 5,
      name: "Sneha Reddy",
      role: "Science Student",
      rating: 4.5,
      text: "The quality of study materials is outstanding. Clear explanations and practice questions helped me understand complex concepts easily.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
      achievement: "NEET Qualified"
    },
    {
      id: 6,
      name: "Vikram Singh",
      role: "Engineering Student",
      rating: 5,
      text: "Excellent resource for competitive exam preparation. The mock tests and detailed solutions are incredibly helpful for practice.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
      achievement: "IIT Selected"
    }
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

    @keyframes borderFlow {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
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

    .testimonial-card {
      background: rgba(15, 20, 40, 0.8);
      border: 1px solid rgba(99, 102, 241, 0.15);
      border-radius: 20px;
      backdrop-filter: blur(20px);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .testimonial-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 24px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }

    .testimonial-card.featured {
      border-color: rgba(99, 102, 241, 0.4);
      box-shadow: 0 12px 48px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      animation: cardFloat 4s ease-in-out infinite;
    }

    .testimonial-card.featured::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #6366f1, transparent);
      animation: borderFlow 3s ease-in-out infinite;
    }

    .testimonial-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent);
    }

    .achievement-badge {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.3) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      border-radius: 20px;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: #6366f1;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1);
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .testimonials-grid {
        grid-template-columns: 1fr !important;
        gap: 1.5rem !important;
      }
      
      .testimonial-card {
        padding: 1.5rem !important;
      }
    }

    @media (max-width: 576px) {
      .testimonials-grid {
        gap: 1rem !important;
      }
    }
  `;

  return (
    <section style={{
      position: 'relative',
      background: '#0b0c10',
      overflow: 'hidden',
      padding: '6rem 0',
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
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {/* Header */}
              <div className="text-center mb-5">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <Sparkles size={32} style={{ color: '#6366f1', marginRight: '1rem' }} />
                  <h2
                    className="title-glow"
                    style={{
                      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                      fontWeight: 'bold',
                      margin: 0,
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Student Success Stories
                  </h2>
                  <Users size={32} style={{ color: '#8b5cf6', marginLeft: '1rem' }} />
                </div>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#cbd5e1',
                  maxWidth: '700px',
                  margin: '0 auto 2rem',
                  lineHeight: '1.6',
                  opacity: '0.9'
                }}>
                  Join thousands of students who have achieved academic excellence with our premium study bundles
                </p>

                {/* Stats */}
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  <div className="d-flex align-items-center gap-2">
                    <Award size={20} style={{ color: '#6366f1' }} />
                    <span style={{ color: '#e2e8f0', fontWeight: '600' }}>10K+ Success Stories</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Star size={20} style={{ color: '#6366f1' }} />
                    <span style={{ color: '#e2e8f0', fontWeight: '600' }}>4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div
                className="testimonials-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '2rem',
                  gridAutoRows: 'auto'
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`testimonial-card ${testimonial.featured ? 'featured' : ''}`}
                    style={{
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'fit-content'
                    }}
                  >
                    {/* Achievement Badge */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="achievement-badge">
                        <Award size={14} />
                        {testimonial.achievement}
                      </div>
                      <Quote size={28} style={{ color: '#6366f1', opacity: 0.3 }} />
                    </div>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < Math.floor(testimonial.rating) ? '#6366f1' : 'none'}
                            color={i < Math.floor(testimonial.rating) ? '#6366f1' : '#4a5568'}
                          />
                        ))}
                      </div>
                      <span style={{
                        color: '#6366f1',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        {testimonial.rating}/5
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <p style={{
                      color: '#e2e8f0',
                      fontSize: '1rem',
                      lineHeight: '1.7',
                      marginBottom: '2rem',
                      flex: 1,
                      fontStyle: 'italic',
                      opacity: '0.9'
                    }}>
                      "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                      <div style={{
                        position: 'relative',
                        marginRight: '1rem'
                      }}>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '50%',
                            border: '2px solid rgba(99, 102, 241, 0.4)',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: -2,
                          right: -2,
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          border: '2px solid #0b0c10',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Star size={8} fill="white" color="white" />
                        </div>
                      </div>
                      <div>
                        <h6 style={{
                          color: '#ffffff',
                          fontWeight: '700',
                          marginBottom: '0.25rem',
                          fontSize: '1rem'
                        }}>
                          {testimonial.name}
                        </h6>
                        <div style={{
                          color: '#6366f1',
                          fontSize: '0.9rem',
                          fontWeight: '500'
                        }}>
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;