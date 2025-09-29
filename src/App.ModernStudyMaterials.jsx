import React from 'react';
import StudyMaterials from './components/StudyMaterials';
import StudyMaterialsHero from './components/StudyMaterialsHero';
import AdvancedFilters from './components/AdvancedFilters';
import BundleGrid from './components/BundleGrid';
import BundleDetailView from './components/BundleDetailView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Mock user data
const mockUser = {
  id: 1,
  name: "Student User",
  email: "student@example.com"
};

// Mock data service for preview
const mockDataService = {
  getBundles: () => Promise.resolve([
    {
      _id: 'bundle-1',
      title: 'JEE Main Complete Package',
      departmentID: {
        _id: 'dept-1',
        department: 'Engineering'
      },
      price: 2999,
      products: ['product-1', 'product-2', 'product-3'],
      description: 'Comprehensive JEE Main preparation with 5000+ practice questions, detailed solutions, and expert video explanations. Includes previous year papers and mock tests.'
    },
    {
      _id: 'bundle-2',
      title: 'NEET Biology Mastery',
      departmentID: {
        _id: 'dept-2',
        department: 'Medical'
      },
      price: 1999,
      products: ['product-4', 'product-5'],
      description: 'Complete biology preparation for NEET with detailed notes, diagrams, and practice questions covering all topics from class 11 and 12 NCERT syllabus.'
    },
    {
      _id: 'bundle-3',
      title: 'Free Mathematics Basics',
      departmentID: {
        _id: 'dept-3',
        department: 'Mathematics'
      },
      price: 0,
      products: ['product-6', 'product-7', 'product-8'],
      description: 'Essential mathematics concepts with step-by-step solutions and practice problems for board exam preparation.'
    },
    {
      _id: 'bundle-4',
      title: 'Physics Fundamentals',
      departmentID: {
        _id: 'dept-4',
        department: 'Science'
      },
      price: 1799,
      products: ['product-9', 'product-10'],
      description: 'Master physics concepts with interactive problems, detailed explanations, and real-world applications.'
    },
    {
      _id: 'bundle-5',
      title: 'Chemistry Complete Guide',
      departmentID: {
        _id: 'dept-5',
        department: 'Science'
      },
      price: 1899,
      products: ['product-11', 'product-12', 'product-13'],
      description: 'Comprehensive chemistry preparation with organic, inorganic, and physical chemistry modules.'
    },
    {
      _id: 'bundle-6',
      title: 'Commerce Essentials',
      departmentID: {
        _id: 'dept-6',
        department: 'Commerce'
      },
      price: 0,
      products: ['product-14'],
      description: 'Essential commerce concepts for board exam preparation with practical examples and case studies.'
    }
  ]),
  
  getPdfsByDepartment: (deptId) => Promise.resolve({
    products: [
      {
        _id: 'product-1',
        title: 'Sample Study Material',
        description: 'This is a sample study material for testing',
        fileUrl: '/sample.pdf'
      }
    ]
  }),
  
  getSubjectsByDepartment: (deptId) => Promise.resolve([
    {
      _id: 'subject-1',
      subject: 'Mathematics Fundamentals',
      description: 'Core mathematical concepts and problem-solving techniques'
    },
    {
      _id: 'subject-2',
      subject: 'Advanced Topics',
      description: 'Advanced mathematical concepts for competitive exams'
    },
    {
      _id: 'subject-3',
      subject: 'Practice Papers',
      description: 'Previous year questions and mock test papers'
    }
  ])
};

// Override the data service for preview
window.mockDataService = mockDataService;

function ModernStudyMaterialsPreview() {
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
            <a className="nav-link fw-bold text-primary" href="#">Study Materials</a>
            <a className="nav-link" href="#">About</a>
            <button className="btn qsolve-btn-primary btn-sm">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Modern Study Materials Page */}
      <StudyMaterials user={mockUser} />

      {/* Footer */}
      <footer className="bg-dark text-white py-5 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5 className="qsolve-brand text-white mb-3">QSolve</h5>
              <p className="text-light opacity-75">
                Your comprehensive study companion for academic excellence. 
                Access premium materials, track progress, and achieve your goals.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Study Materials</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Engineering</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Medical</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Commerce</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Science</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3">Features</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Smart Search</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Progress Tracking</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Bookmarks</a></li>
                <li><a href="#" className="text-light opacity-75 text-decoration-none">Downloads</a></li>
              </ul>
            </div>
            <div className="col-lg-4 mb-4">
              <h6 className="fw-bold mb-3">Stay Connected</h6>
              <p className="text-light opacity-75 mb-3">
                Get updates on new study materials and features.
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

export default ModernStudyMaterialsPreview;