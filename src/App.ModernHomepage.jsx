import React from 'react';
import HomePage from './components/HomePage';
import HeroSection from './components/HeroSection';
import FeaturedBundles from './components/FeaturedBundles';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Mock data for preview
const mockBundles = [
  {
    id: 1,
    name: "JEE Main Complete Package",
    price: 2999,
    rating: 4.8,
    description: "Comprehensive study material for JEE Main with 5000+ practice questions, detailed solutions, and expert video explanations. Includes previous year papers and mock tests."
  },
  {
    id: 2,
    name: "NEET Biology Mastery",
    price: 1999,
    rating: 4.9,
    description: "Complete biology preparation for NEET with detailed notes, diagrams, and practice questions covering all topics from class 11 and 12 NCERT syllabus."
  },
  {
    id: 3,
    name: "Class 12 Mathematics",
    price: 1499,
    rating: 4.7,
    description: "Advanced mathematics concepts with step-by-step solutions, practice problems, and exam-focused preparation materials for board exams."
  },
  {
    id: 4,
    name: "Physics Fundamentals",
    price: 1799,
    rating: 4.6,
    description: "Master physics concepts with interactive problems, detailed explanations, and real-world applications."
  },
  {
    id: 5,
    name: "Chemistry Complete Guide",
    price: 1899,
    rating: 4.8,
    description: "Comprehensive chemistry preparation with organic, inorganic, and physical chemistry modules."
  },
  {
    id: 6,
    name: "English Literature",
    price: 999,
    rating: 4.5,
    description: "Complete guide to English literature with analysis, summaries, and critical thinking exercises."
  }
];

const mockUser = {
  id: 1,
  name: "Student User",
  email: "student@example.com"
};

function ModernHomepagePreview() {
  const handleBundleClick = (bundle) => {
    console.log('Bundle clicked:', bundle.name);
    alert(`Viewing ${bundle.name} - This would navigate to study materials page`);
  };

  const handleViewAllMaterials = () => {
    console.log('View all materials clicked');
    alert('This would navigate to the study materials page');
  };

  const handleGetStarted = () => {
    console.log('Get started clicked');
    alert('This would navigate to authentication or study materials page');
  };

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand qsolve-brand" href="#">
            QSolve
          </a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#">Home</a>
            <a className="nav-link" href="#">Materials</a>
            <a className="nav-link" href="#">About</a>
            <button className="btn qsolve-btn-primary btn-sm">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Modern Homepage */}
      <HomePage 
        bundles={mockBundles}
        user={mockUser}
      />

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="qsolve-brand text-white mb-3">QSolve</h5>
              <p className="text-light opacity-75">
                Empowering students with premium study materials and expert guidance 
                to achieve academic excellence.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Platform</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Study Materials</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Question Papers</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Mock Tests</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Expert Support</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Help Center</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Contact Us</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">FAQ</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Community</a></li>
              </ul>
            </div>
            <div className="col-lg-4 mb-4">
              <h6 className="fw-bold mb-3">Stay Updated</h6>
              <p className="text-light opacity-75 mb-3">
                Get the latest study tips and material updates.
              </p>
              <div className="d-flex">
                <input 
                  type="email" 
                  className="form-control me-2" 
                  placeholder="Enter your email"
                />
                <button className="btn qsolve-btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
          <hr className="border-light opacity-25 my-4" />
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="text-light opacity-75 mb-0">
                © 2025 QSolve. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <a href="#" className="text-light opacity-75 text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-light opacity-75 text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ModernHomepagePreview;