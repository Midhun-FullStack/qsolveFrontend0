import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookOpen, FileDown, Star, Clock, Users, Package } from 'lucide-react';

const HomePage = ({ subjects, bundles = [], user }) => {
  const navigate = useNavigate();
  // Handle bundle click - navigate to study materials
  const handleBundleClick = (bundle) => {
    navigate('/study-materials');
    toast.info(`Viewing study materials`);
  };

  const handleViewAllMaterials = () => {
    navigate('/study-materials');
  };
      {/* Study Materials Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-gradient-primary text-white">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h4 className="card-title mb-2">Study Materials</h4>
                  <p className="card-text mb-3">
                    Access your purchased bundles and download study materials
                  </p>
                  <button 
                    className="btn btn-light btn-lg"
                    onClick={handleViewAllMaterials}
                  >
                    <Package size={20} className="me-2" />
                    View All Materials
                  </button>
                </div>
                <div className="col-md-4 text-center">
                  <Package size={80} className="opacity-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Bundles */}
      {bundles.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Quick Access - Study Bundles</h4>
              <button 
                className="btn btn-outline-primary"
                onClick={handleViewAllMaterials}
              >
                View All
              </button>
            </div>
          </div>
          {bundles.slice(0, 3).map((bundle) => (
            <div key={bundle._id || bundle.id} className="col-lg-4 mb-3">
              <div className="card h-100 shadow-sm qsolve-bundle-card">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-primary">
                      {bundle.name || bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`}
                    </h5>
                    {bundle.departmentID?.department && (
                      <small className="text-primary d-block mb-2">
                        <BookOpen size={12} className="me-1" />
                        {bundle.departmentID.department}
                      </small>
                    )}
                    <p className="card-text text-muted">
                      {bundle.products?.length || 0} study materials
                    </p>
                  </div>
                  <div className="mt-3">
                    <button className="btn btn-outline-primary w-100" onClick={() => handleBundleClick(bundle)}>
                      <Package size={16} className="me-2" />
                      View Materials
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Show loading state if subjects are empty
  if (!subjects || subjects.length === 0) {
    return (
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading subjects...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubjectClick = (subject, contentType) => {
    navigate(`/subject/${subject.id}?type=${contentType}`);
  };

  const getStatsCards = () => [
    { title: 'Total Downloads', value: '23', icon: FileDown, color: 'primary' },
    { title: 'Completed Tests', value: '15', icon: BookOpen, color: 'success' },
    { title: 'Average Score', value: '78.5%', icon: Star, color: 'warning' },
    { title: 'Study Streak', value: '7 days', icon: Clock, color: 'info' }
  ];

  return (
    <div className="container-fluid py-4">
      {/* Welcome Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2 className="card-title mb-2">Welcome back, {user?.name || 'Student'}!</h2>
                  <p className="card-text mb-0">
                    Continue your learning journey with our comprehensive question papers
                    and study materials.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <BookOpen size={80} className="opacity-75" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Subject Cards */}
      <div className="row">
        {subjects.map((subject) => (
          <div key={subject.id} className="col-lg-6 ">
            <div className="card qsolve-subject-card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between  mb-3">
                  <div>
                    <h5 className="card-title text-primary">{subject.displayName}</h5>
                    <p className="card-text text-muted">{subject.description}</p>
                  </div>
                  <BookOpen size={40} className="text-primary opacity-75" />
                </div>
                
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="fw-bold text-success">{subject.freeContent}</div>
                    <small className="text-muted">Free</small>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold text-warning">{subject.paidContent}</div>
                    <small className="text-muted">Premium</small>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold text-info">{subject.totalQuestions}</div>
                    <small className="text-muted">Questions</small>
                  </div>
                </div>
                
                <div className="d-grid gap-2">
                  {(selectedFilter === 'all' || selectedFilter === 'free') && (
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handleSubjectClick(subject, 'free')}
                    >
                      <FileDown size={16} className="me-2" />
                      Browse Free Content
                    </button>
                  )}
                  {(selectedFilter === 'all' || selectedFilter === 'paid') && (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => handleSubjectClick(subject, 'paid')}
                    >
                      <Star size={16} className="me-2" />
                      Browse Premium Content
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default HomePage;