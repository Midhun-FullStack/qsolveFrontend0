import { BookOpen, Users, Award, Target, Mail, Phone, MapPin } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Access thousands of question papers across multiple engineering disciplines'
    },
    {
      icon: Users,
      title: 'Expert Curated',
      description: 'All content is reviewed and curated by subject matter experts'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'High-quality materials that help you excel in your studies'
    },
    {
      icon: Target,
      title: 'Focused Learning',
      description: 'Targeted practice materials for better exam preparation'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Question Papers' },
    { number: '50,000+', label: 'Students Helped' },
    { number: '25+', label: 'Engineering Subjects' },
    { number: '99%', label: 'Success Rate' }
  ];

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 qsolve-brand mb-3">About Q SOLVE</h1>
          <p className="lead text-muted">
            Your trusted partner in academic excellence and engineering education
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="row mb-5">
        <div className="col-lg-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title text-primary mb-3">Our Mission</h3>
              <p className="card-text">
                Q Solve is dedicated to empowering engineering students with comprehensive, 
                high-quality question papers and study materials. We believe that access to 
                the right resources at the right time can make all the difference in a 
                student's academic journey.
              </p>
              <p className="card-text">
                Our platform bridges the gap between theoretical knowledge and practical 
                application, helping students prepare effectively for their examinations 
                and build a strong foundation for their careers.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 mb-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="card-title text-primary mb-3">Our Vision</h3>
              <p className="card-text">
                To become the leading educational platform that transforms how engineering 
                students learn, practice, and excel in their academic pursuits. We envision 
                a future where every student has access to quality educational resources 
                regardless of their geographical or economic constraints.
              </p>
              <p className="card-text">
                Through continuous innovation and commitment to excellence, we aim to 
                contribute to the development of skilled engineers who will shape the 
                future of technology and society.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Why Choose Q Solve?</h2>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 text-center border-0 shadow-sm qsolve-card">
                  <div className="card-body p-4">
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
      </div>

      {/* Stats Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Our Impact</h2>
              <div className="row text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="col-lg-3 col-md-6 mb-3">
                    <div className="h2 fw-bold mb-1">{stat.number}</div>
                    <div className="text-white-50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Available Subjects</h2>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card qsolve-subject-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <BookOpen size={32} className="text-primary me-3" />
                    <div>
                      <h5 className="card-title mb-1">Mechanical Engineering</h5>
                      <p className="card-text text-muted mb-0">
                        Comprehensive question papers covering all core subjects
                      </p>
                    </div>
                  </div>
                  <div className="row text-center">
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
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 mb-4">
              <div className="card qsolve-subject-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <BookOpen size={32} className="text-primary me-3" />
                    <div>
                      <h5 className="card-title mb-1">Civil Engineering</h5>
                      <p className="card-text text-muted mb-0">
                        Complete civil engineering question papers and resources
                      </p>
                    </div>
                  </div>
                  <div className="row text-center">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Get In Touch</h3>
              <div className="row text-center">
                <div className="col-md-4 mb-3">
                  <div className="text-primary mb-2">
                    <Mail size={32} />
                  </div>
                  <h6>Email Us</h6>
                  <p className="text-muted">support@qsolve.com</p>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="text-primary mb-2">
                    <Phone size={32} />
                  </div>
                  <h6>Call Us</h6>
                  <p className="text-muted">+91 98765 43210</p>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="text-primary mb-2">
                    <MapPin size={32} />
                  </div>
                  <h6>Visit Us</h6>
                  <p className="text-muted">Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;