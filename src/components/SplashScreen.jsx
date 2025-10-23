import { useState, useEffect, memo } from 'react';
import { Zap, BookOpen, Target, Award } from 'lucide-react';

const SplashScreen = memo(({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isReducedMotion) setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isReducedMotion]);

  const phases = [
    { text: 'Initializing...', icon: Zap },
    { text: 'Loading Resources...', icon: BookOpen },
    { text: 'Preparing Interface...', icon: Target },
    { text: 'Ready!', icon: Award }
  ];

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => prev < phases.length - 1 ? prev + 1 : prev);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 2 : prev);
    }, 40);

    const timer = setTimeout(() => {
      if (onComplete) setTimeout(onComplete, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const styles = `
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
      50% { text-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }
    
    @keyframes iconBounce {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-8px) scale(1.05); }
    }
    
    @keyframes progressShimmer {
      0% { background-position: -200px 0; }
      100% { background-position: 200px 0; }
    }
    
    .title-glow { 
      animation: ${isReducedMotion ? 'none' : 'titleGlow 2s ease-in-out infinite'};
      letter-spacing: -0.025em;
      line-height: 1.1;
    }
    
    .icon-bounce { 
      animation: ${isReducedMotion ? 'none' : 'iconBounce 1.5s ease-in-out infinite'};
      backdrop-filter: blur(10px);
      border: 2px solid rgba(99, 102, 241, 0.4);
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    
    .progress-bar {
      background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%);
      background-size: 200px 100%;
      animation: ${isReducedMotion ? 'none' : 'progressShimmer 2s infinite linear'};
      box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    }
    
    .progress-container {
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  `;

  const CurrentIcon = phases[currentPhase]?.icon || Zap;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0b0c10',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      <style>{styles}</style>

      {/* Simplified Background */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(40px)'
        }}
      />
      
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          zIndex: -1,
          filter: 'blur(50px)'
        }}
      />

      {/* Cursor Glow Effect */}
      {!isReducedMotion && (
        <div
          style={{
            position: 'fixed',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            transition: 'left 0.1s ease-out, top 0.1s ease-out'
          }}
        />
      )}

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        color: 'white',
        maxWidth: '600px',
        padding: '2rem'
      }}>
        {/* Logo/Title */}
        <div className="mb-5">
          <h1
            className="title-glow"
            style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}
          >
            Q SOLVE
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: '#e2e8f0',
            fontWeight: '400',
            marginBottom: '3.5rem',
            opacity: '0.9',
            letterSpacing: '0.025em'
          }}>
            Your Gateway to Academic Excellence
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mb-4">
          <div
            className="icon-bounce"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '2px solid rgba(99, 102, 241, 0.3)',
              marginBottom: '2rem'
            }}
          >
            <CurrentIcon size={32} style={{ color: '#6366f1' }} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="progress-container" style={{
            width: '100%',
            height: '6px',
            borderRadius: '6px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div
              className="progress-bar"
              style={{
                height: '100%',
                borderRadius: '6px',
                width: `${progress}%`,
                transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <div style={{
          color: '#e2e8f0',
          fontSize: '1.1rem',
          fontWeight: '500',
          minHeight: '28px',
          marginBottom: '0.5rem',
          letterSpacing: '0.025em'
        }}>
          {phases[currentPhase]?.text || 'Loading...'}
        </div>

        {/* Progress Percentage */}
        <div style={{
          color: '#6366f1',
          fontSize: '1rem',
          fontWeight: '700',
          textShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
          letterSpacing: '0.05em'
        }}>
          {progress}%
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.05)',
          border: '1px solid rgba(99, 102, 241, 0.1)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.03)',
          border: '1px solid rgba(99, 102, 241, 0.08)'
        }} />
      </div>
    </div>
  );
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen;