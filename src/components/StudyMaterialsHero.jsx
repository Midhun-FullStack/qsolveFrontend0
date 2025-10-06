import { Search, Filter, BookOpen, Download, Users } from 'lucide-react';

const StudyMaterialsHero = ({
  searchTerm,
  onSearchChange,
  onFilterClick,
  stats = { bundles: 0, downloads: 0, students: 0 }
}) => {
  return (
    <section
      className="position-relative overflow-hidden py-5"
      style={{
        background: 'white', // White background
        minHeight: '450px',
        color: '#1a365d', // Navy blue text
        fontFamily: 'var(--bs-font-display)'
      }}
    >
      {/* Background Pattern */}
      <div
        className="position-absolute w-100 h-100 top-0 start-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a365d' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 1
        }}
      ></div>

      {/* Floating Navy Blue Accent Shapes */}
      <div className="position-absolute w-100 h-100" style={{ zIndex: 2 }}>
        <div
          className="floating-element position-absolute"
          style={{
            top: '20%',
            left: '10%',
            width: '90px',
            height: '90px',
            background: 'rgba(26, 54, 93, 0.08)', // Navy blue accent
            borderRadius: '50%',
            backdropFilter: 'blur(12px)'
          }}
        ></div>
        <div
          className="floating-element position-absolute"
          style={{
            top: '65%',
            right: '15%',
            width: '130px',
            height: '130px',
            background: 'rgba(26, 54, 93, 0.05)', // Navy blue accent
            borderRadius: '40%',
            backdropFilter: 'blur(18px)'
          }}
        ></div>
      </div>

      <div
        className="container position-relative text-center"
        style={{ zIndex: 3 }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Main Title */}
            <h1
              className="display-1-modern fw-bold mb-3"
              style={{ color: '#1a365d' }}
            >
              Your{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #FFD700, #FFC107)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Study Hub
              </span>
            </h1>
            <p
              className="lead mb-5"
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                color: '#4a5568'
              }}
            >
              Access premium study materials, track your progress, and excel in
              your academic journey
            </p>

            {/* Advanced Search Bar */}
            <div className="row justify-content-center mb-5">
              <div className="col-lg-8">
                <div
                  className="p-3 rounded-4 shadow-sm"
                  style={{
                    background: 'rgba(26, 54, 93, 0.05)',
                    border: '1px solid rgba(26, 54, 93, 0.1)'
                  }}
                >
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-transparent border-0">
                      <Search size={26} style={{ color: '#FFD700' }} />
                    </span>
                    <input
                      type="text"
                      className="form-control bg-transparent border-0"
                      placeholder="Search for study materials, subjects, or topics..."
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: '500',
                        color: '#1a365d'
                      }}
                    />
                    <button
                      className="btn"
                      onClick={onFilterClick}
                      aria-label="Open filters"
                      style={{
                        background: 'linear-gradient(135deg, #1a365d, #2d3748)',
                        border: 'none',
                        color: 'white',
                        fontWeight: '600',
                        padding: '0.875rem 2rem',
                        borderRadius: '0.75rem'
                      }}
                    >
                      <Filter size={22} className="me-2" />
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="row g-4">
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 text-center shadow-sm"
                  style={{
                    background: 'rgba(26, 54, 93, 0.05)',
                    border: '1px solid rgba(26, 54, 93, 0.1)'
                  }}
                >
                  <BookOpen
                    size={36}
                    style={{ color: '#FFD700' }}
                    className="mb-3"
                    aria-hidden="true"
                  />
                  <div
                    className="h2 fw-bold mb-1 stat-counter"
                    style={{ color: '#1a365d' }}
                    aria-label={`${stats.bundles} study bundles`}
                  >
                    {stats.bundles}+
                  </div>
                  <div
                    style={{
                      fontWeight: '600',
                      color: '#4a5568'
                    }}
                  >
                    Study Bundles
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 text-center shadow-sm"
                  style={{
                    background: 'rgba(26, 54, 93, 0.05)',
                    border: '1px solid rgba(26, 54, 93, 0.1)'
                  }}
                >
                  <Download
                    size={36}
                    style={{ color: '#FFD700' }}
                    className="mb-3"
                    aria-hidden="true"
                  />
                  <div
                    className="h2 fw-bold mb-1 stat-counter"
                    style={{ color: '#1a365d' }}
                    aria-label={`${stats.downloads} thousand downloads`}
                  >
                    {stats.downloads}K+
                  </div>
                  <div
                    style={{
                      fontWeight: '600',
                      color: '#4a5568'
                    }}
                  >
                    Downloads
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="p-4 rounded-4 text-center shadow-sm"
                  style={{
                    background: 'rgba(26, 54, 93, 0.05)',
                    border: '1px solid rgba(26, 54, 93, 0.1)'
                  }}
                >
                  <Users
                    size={36}
                    style={{ color: '#FFD700' }}
                    className="mb-3"
                    aria-hidden="true"
                  />
                  <div
                    className="h2 fw-bold mb-1 stat-counter"
                    style={{ color: '#1a365d' }}
                    aria-label={`${stats.students} thousand active students`}
                  >
                    {stats.students}K+
                  </div>
                  <div
                    style={{
                      fontWeight: '600',
                      color: '#4a5568'
                    }}
                  >
                    Active Students
                  </div>
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
