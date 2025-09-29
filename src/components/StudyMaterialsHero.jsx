import { Search, Filter, BookOpen, Download, Users, TrendingUp } from 'lucide-react';

const StudyMaterialsHero = ({ 
  searchTerm, 
  onSearchChange, 
  onFilterClick,
  stats = { bundles: 0, downloads: 0, students: 0 }
}) => {
  return (
    <section className="position-relative overflow-hidden py-5" style={{
      background: 'linear-gradient(135deg, hsl(220, 100%, 50%), hsl(260, 100%, 60%))',
      minHeight: '400px'
    }}>
      {/* Background Image with Overlay */}
      <div className="position-absolute w-100 h-100 top-0 start-0">
        <div 
          className="w-100 h-100"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1639675973843-027a10e2f5a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxzdHVkeSUyMHdvcmtzcGFjZSUyMGJvb2tzJTIwbGFwdG9wJTIwbWluaW1hbHxlbnwwfDB8fGJsdWV8MTc1ODg5NTY2N3ww&ixlib=rb-4.1.0&q=85")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        ></div>
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{
          background: 'linear-gradient(135deg, rgba(34, 193, 195, 0.8), rgba(253, 187, 45, 0.8))'
        }}></div>
      </div>

      {/* Floating Background Elements */}
      <div className="position-absolute w-100 h-100">
        <div className="floating-element position-absolute" style={{
          top: '15%',
          left: '8%',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div className="floating-element position-absolute" style={{
          top: '70%',
          right: '12%',
          width: '120px',
          height: '120px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '30%',
          backdropFilter: 'blur(15px)'
        }}></div>
      </div>

      <div className="container position-relative text-white">
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            {/* Main Title */}
            <h1 className="display-4 fw-bold mb-3">
              Your <span className="text-warning">Study Hub</span>
            </h1>
            <p className="lead mb-5 opacity-90">
              Access premium study materials, track your progress, and excel in your academic journey
            </p>

            {/* Advanced Search Bar */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <div className="glass-card p-3 rounded-3">
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-transparent border-0">
                      <Search size={24} className="text-primary" />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-transparent border-0 text-dark"
                      placeholder="Search for study materials, subjects, or topics..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      style={{ fontSize: '1.1rem' }}
                    />
                    <button 
                      className="btn qsolve-btn-primary"
                      onClick={onFilterClick}
                    >
                      <Filter size={20} className="me-2" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="glass-card p-4 rounded-3 text-center">
                  <BookOpen size={32} className="text-warning mb-3" />
                  <div className="h3 fw-bold mb-1">{stats.bundles}+</div>
                  <div className="opacity-75">Study Bundles</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-4 rounded-3 text-center">
                  <Download size={32} className="text-success mb-3" />
                  <div className="h3 fw-bold mb-1">{stats.downloads}K+</div>
                  <div className="opacity-75">Downloads</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="glass-card p-4 rounded-3 text-center">
                  <Users size={32} className="text-info mb-3" />
                  <div className="h3 fw-bold mb-1">{stats.students}K+</div>
                  <div className="opacity-75">Active Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudyMaterialsHero;