import { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) {
        setTimeout(onComplete, 500);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="qsolve-splash d-flex align-items-center justify-content-center">
      <div className="text-center text-white">
        <div className="mb-4">
          <h1 className="display-1 fw-bold mb-3">Q SOLVE</h1>
          <p className="lead">Your Gateway to Academic Success</p>
        </div>
        
        {loading && (
          <div className="mt-5">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;