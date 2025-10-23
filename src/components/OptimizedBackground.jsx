import React, { memo } from 'react';
import { useAnimation } from '../contexts/AnimationContext';

const OptimizedBackground = memo(({
  showGrid = true,
  showBlobs = true,
  showParticles = true,
  opacity = 0.04,
  particleCount = 4
}) => {
  const { mousePos, isReducedMotion } = useAnimation();

  const keyframes = `
    @keyframes optimizedFloatBlob1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(20px, -30px) scale(1.05); }
    }

    @keyframes optimizedFloatBlob2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(-25px, 25px) scale(0.95); }
    }

    @keyframes optimizedPulse {
      0%, 100% { r: 4; opacity: 0.8; }
      50% { r: 8; opacity: 0.4; }
    }

    @keyframes optimizedGridFlow {
      0% { transform: translateY(0); }
      100% { transform: translateY(75px); }
    }

    @keyframes optimizedOrbitParticle {
      0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
    }

    .optimized-blob-1 {
      animation: ${isReducedMotion ? 'none' : 'optimizedFloatBlob1 6s ease-in-out infinite'};
    }

    .optimized-blob-2 {
      animation: ${isReducedMotion ? 'none' : 'optimizedFloatBlob2 8s ease-in-out infinite'};
    }

    .optimized-pulse {
      animation: ${isReducedMotion ? 'none' : 'optimizedPulse 3s ease-in-out infinite'};
    }

    .optimized-grid {
      animation: ${isReducedMotion ? 'none' : 'optimizedGridFlow 15s linear infinite'};
    }

    .optimized-particle {
      animation: ${isReducedMotion ? 'none' : 'optimizedOrbitParticle 12s linear infinite'};
    }
  `;

  return (
    <>
      <style>{keyframes}</style>

      {/* Optimized SVG Background */}
      <svg
        className="optimized-bg"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      >
        <defs>
          <radialGradient id="optimizedGlow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#00ff7f', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#00cc66', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="optimizedGlow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#00cc66', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#009950', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Simplified Grid */}
        {showGrid && (
          <g className="optimized-grid" opacity={opacity} stroke="#00ff7f" strokeWidth="1">
            {[...Array(6)].map((_, i) => (
              <line key={`v${i}`} x1={i * 233} y1="0" x2={i * 233} y2="900" />
            ))}
            {[...Array(4)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 225} x2="1400" y2={i * 225} />
            ))}
          </g>
        )}

        {/* Simplified Blobs */}
        {showBlobs && (
          <>
            <g className="optimized-blob-1">
              <circle cx="250" cy="250" r="100" fill="url(#optimizedGlow1)" />
            </g>
            <g className="optimized-blob-2">
              <circle cx="1150" cy="650" r="120" fill="url(#optimizedGlow2)" />
            </g>
          </>
        )}

        {/* Simplified Particles */}
        {showParticles && (
          <g transform="translate(700, 450)">
            {[...Array(particleCount)].map((_, i) => (
              <g key={`particle${i}`} className="optimized-particle" style={{ animationDelay: `${i * 3}s` }}>
                <circle cx="0" cy="0" r="2" fill="#00ff7f" opacity="0.4" />
              </g>
            ))}
          </g>
        )}

        {/* Simplified Nodes */}
        <g>
          <circle cx="400" cy="250" r="3" fill="#00ff7f" opacity="0.6" />
          <circle cx="400" cy="250" r="3" fill="none" stroke="#00ff7f" strokeWidth="1" className="optimized-pulse" />
        </g>
        <g>
          <circle cx="1000" cy="550" r="3" fill="#00cc66" opacity="0.6" />
          <circle cx="1000" cy="550" r="3" fill="none" stroke="#00cc66" strokeWidth="1" className="optimized-pulse" />
        </g>
      </svg>

      {/* Optimized Cursor Glow */}
      {!isReducedMotion && (
        <div
          style={{
            position: 'fixed',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
            left: mousePos.x - 150,
            top: mousePos.y - 150,
            transition: 'left 0.1s ease-out, top 0.1s ease-out'
          }}
        />
      )}
    </>
  );
});

OptimizedBackground.displayName = 'OptimizedBackground';

export default OptimizedBackground;