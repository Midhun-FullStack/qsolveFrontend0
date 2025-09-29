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
                <span className="text-primary"> Q Solve</span>
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
            
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div className="card shadow-lg border-0 p-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <BookOpen size={80} className="text-primary mx-auto mb-3" />
                  <h4 className="card-title">Ready to Excel?</h4>
                  <p className="card-text text-muted">
                    Join thousands of students who have improved their grades with Q Solve
                  </p>
                  <div className="d-flex justify-content-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-warning" fill="currentColor" />
                    ))}
                  </div>
                  <small className="text-muted mt-2">Rated 4.9/5 by students</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-7">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Why Choose Q Solve?</h2>
            <p className="lead text-muted">Everything you need to succeed in your engineering studies</p>
          </div>
          
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 border-0 shadow-sm qsolve-card">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-3">
                      <feature.icon size={48} />
                    </div>
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">What Our Students Say</h2>
            <p className="lead text-muted">Hear from students who have transformed their engineering careers with Q Solve</p>
          </div>

          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="qsolve-testimonial-card h-100 p-4">
                  <div className="text-center mb-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="qsolve-testimonial-avatar mb-3"
                    />
                    <h6 className="fw-bold">{testimonial.name}</h6>
                    <small className="text-muted">{testimonial.role}</small>
                  </div>
                  <blockquote className="blockquote text-center">
                    <p className="mb-0">"{testimonial.quote}"</p>
                  </blockquote>
                  <div className="text-center mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-warning me-1" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Available Subjects</h2>
            <p className="lead text-muted">Comprehensive coverage of core engineering disciplines</p>
          </div>
          
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card qsolve-subject-card h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <BookOpen size={40} className="text-primary me-3" />
                    <div>
                      <h4 className="card-title mb-1">Mechanical Engineering</h4>
                      <p className="card-text text-muted mb-0">
                        Thermodynamics, Fluid Mechanics, Machine Design & more
                      </p>
                    </div>
                  </div>
                  
                  <div className="row text-center mb-3">
                    <div className="col-4">
                      <div className="fw-bold text-success">15</div>
                      <small className="text-muted">Free Papers</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-warning">45</div>
                      <small className="text-muted">Premium Papers</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-info">1250</div>
                      <small className="text-muted">Questions</small>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline-primary w-100" onClick={onGetStarted}>
                    Explore Mechanical Engineering
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="card qsolve-subject-card h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <BookOpen size={40} className="text-primary me-3" />
                    <div>
                      <h4 className="card-title mb-1">Civil Engineering</h4>
                      <p className="card-text text-muted mb-0">
                        Structural Analysis, Concrete Technology, Surveying & more
                      </p>
                    </div>
                  </div>
                  
                  <div className="row text-center mb-3">
                    <div className="col-4">
                      <div className="fw-bold text-success">12</div>
                      <small className="text-muted">Free Papers</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-warning">38</div>
                      <small className="text-muted">Premium Papers</small>
                    </div>
                    <div className="col-4">
                      <div className="fw-bold text-info">980</div>
                      <small className="text-muted">Questions</small>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline-primary w-100" onClick={onGetStarted}>
                    Explore Civil Engineering
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="lead mb-4">
            Join thousands of students who are already excelling with Q Solve
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-light btn-lg" onClick={onGetStarted}>
              Get Started Free
              <ArrowRight size={20} className="ms-2" />
            </button>
            <button className="btn btn-outline-light btn-lg" onClick={onLogin}>
              Sign In to Continue
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <span className="qsolve-brand text-white">Q SOLVE</span>
              <p className="mb-0 text-muted">Your Gateway to Academic Success</p>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                © 2024 Q Solve. All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;