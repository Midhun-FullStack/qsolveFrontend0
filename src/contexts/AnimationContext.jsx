import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Throttle function for performance
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

const AnimationContext = createContext();

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    // Return default values when not within provider
    return {
      mousePos: { x: 0, y: 0 },
      isReducedMotion: false
    };
  }
  return context;
};

export const AnimationProvider = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Single throttled mouse move handler for entire app
  const throttledMouseMove = useCallback(
    throttle((e) => {
      if (!isReducedMotion) {
        // Only update if position changed significantly (performance optimization)
        const newX = e.clientX;
        const newY = e.clientY;
        setMousePos(prev => {
          if (Math.abs(prev.x - newX) > 5 || Math.abs(prev.y - newY) > 5) {
            return { x: newX, y: newY };
          }
          return prev;
        });
      }
    }, 16), // ~60fps
    [isReducedMotion]
  );

  useEffect(() => {
    if (!isReducedMotion) {
      window.addEventListener('mousemove', throttledMouseMove);
      return () => window.removeEventListener('mousemove', throttledMouseMove);
    }
  }, [throttledMouseMove, isReducedMotion]);

  const value = {
    mousePos,
    isReducedMotion
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};