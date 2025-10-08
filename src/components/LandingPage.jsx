import { BookOpen, Star, Users, Award, ArrowRight } from 'lucide-react';

const LandingPage = ({ onGetStarted, onLogin }) => {
  const features = [
    {
      icon: BookOpen,
      title: 'Extensive Question Bank',
      description: 'Access thousands of carefully curated question papers from top engineering colleges'
    },
    {
      icon: Star,
      title: 'Expert Verified',
      description: 'All content is reviewed and verified by subject matter experts and professors'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of over 50,000 engineering students preparing together'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '99% of our users report improved exam performance and better grades'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Mechanical Engineering Student',
      quote: 'Q Solve helped me ace my finals with its comprehensive question bank. Highly recommended!',
      avatar: 'https://via.placeholder.com/60x60/007bff/ffffff?text=SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Civil Engineering Graduate',
      quote: 'The expert-verified content gave me the confidence I needed for my engineering exams.',
      avatar: 'https://via.placeholder.com/60x60/28a745/ffffff?text=MC'
    },
    {
      name: 'Priya Patel',
      role: 'Aspiring Engineer',
      quote: 'Amazing platform! The community support and quality materials made learning enjoyable.',
      avatar: 'https://via.placeholder.com/60x60/ffc107/000000?text=PP'
    },
    {
      name: 'David Kumar',
      role: 'Engineering Professor',
      quote: 'I recommend Q Solve to all my students. It\'s a game-changer for exam preparation.',
      avatar: 'https://via.placeholder.com/60x60/dc3545/ffffff?text=DK'
    }
  ];

  return (
    <div className="min-vh-100">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <span className="navbar-brand qsolve-brand">Q SOLVE</span>
          <div className="navbar-nav ms-auto">
            <button className="btn btn-outline-primary me-2" onClick={onLogin}>
              Sign In
            </button>
            <button className="btn qsolve-btn-primary" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-6" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <h1 className="display-3 fw-bolder mb-4">
                Master Engineering with
                <span style={{ color: '#FFD700' }}> Q Solve</span>
              </h1>
              <p className="lead mb-4 text-muted">
                Access comprehensive question papers, practice tests, and study materials 
                for Mechanical and Civil Engineering. Prepare smarter, not harder.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn qsolve-btn-primary btn-lg" onClick={onGetStarted}>
                  Start Learning Today
                  <ArrowRight size={20} className="ms-2" />
                </button>
                <button className="btn btn-outline-primary btn-lg" onClick={onLogin}>
                  Sign In
                </button>
              </div>
              
              {/* Stats */}
              <div className="row mt-5">
                <div className="col-4">
                  <div className="text-center">
                    <div className="h3 fw-bold text-primary">10K+</div>
                    <small className="text-muted">Question Papers</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center">
                    <div className="h3 fw-bold text-primary">50K+</div>
                    <small className="text-muted">Students</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="text-center">
                    <div className="h3 fw-bold text-primary">99%</div>
                    <small className="text-muted">Success Rate</small>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default LandingPage;