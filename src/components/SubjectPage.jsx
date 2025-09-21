import { useState, useMemo } from 'react';
import { ChevronLeft, FileDown, Star, Clock, Users, Filter, Search } from 'lucide-react';

const SubjectPage = ({ subject, papers, contentType, onBack, onDownload, fetchQuestionBanksBySubject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectPapers, setSubjectPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(false);
  const itemsPerPage = 6;

  // Fetch papers specific to this subject
  useEffect(() => {
    const fetchPapers = async () => {
      if (subject && fetchQuestionBanksBySubject) {
        setLoadingPapers(true);
        try {
          const subjectSpecificPapers = await fetchQuestionBanksBySubject(subject.id);
          setSubjectPapers(subjectSpecificPapers);
        } catch (error) {
          console.error('Failed to fetch subject papers:', error);
          setSubjectPapers(papers); // Fallback to all papers
        } finally {
          setLoadingPapers(false);
        }
      } else {
        setSubjectPapers(papers);
      }
    };

    fetchPapers();
  }, [subject, fetchQuestionBanksBySubject, papers]);

  const filteredAndSortedPapers = useMemo(() => {
    const papersToFilter = subjectPapers.length > 0 ? subjectPapers : papers;
    let filtered = papersToFilter.filter(paper => {
      const matchesSubject = paper.subject === subject.name;
      const matchesType = contentType === 'all' || paper.type === contentType;
      const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || paper.difficulty === difficultyFilter;
      
      return matchesSubject && matchesType && matchesSearch && matchesDifficulty;
    });

    // Sort papers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [papers, subject.name, contentType, searchTerm, difficultyFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedPapers.length / itemsPerPage);
  const currentPapers = filteredAndSortedPapers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getDifficultyBadgeClass = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success';
      case 'intermediate': return 'bg-warning';
      case 'advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleDownload = async (paper) => {
    try {
      console.log('Downloading paper:', paper.title);
      toast.success(`${paper.type === 'free' ? 'Downloaded' : 'Purchased and downloaded'}: ${paper.title}`);
    } catch (err) {
      toast.error('Download failed. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (!subject) {
    return (
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 text-center">
            <h3>Subject not found</h3>
            <button className="btn btn-primary" onClick={handleBack}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center mb-3">
            <button className="btn btn-outline-primary me-3" onClick={handleBack}>
              <ChevronLeft size={20} />
            </button>
            <div>
              <h2 className="mb-1">{subject.displayName}</h2>
              <p className="text-muted mb-0">
                {contentType === 'free' ? 'Free Content' : 
                 contentType === 'paid' ? 'Premium Content' : 'All Content'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search question papers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="title">Sort by Title</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="downloads">Sort by Downloads</option>
                    <option value="price">Sort by Price</option>
                  </select>
                </div>
                
                <div className="col-md-2">
                  <div className="text-muted small">
                    {filteredAndSortedPapers.length} papers found
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Papers Grid */}
      <div className="row">
        {currentPapers.map((paper) => (
          <div key={paper.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card qsolve-paper-card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h6 className="card-title">{paper.title}</h6>
                  <span className={`badge ${getDifficultyBadgeClass(paper.difficulty)} text-white`}>
                    {paper.difficulty}
                  </span>
                </div>
                
                <div className="row text-center mb-3">
                  <div className="col-3">
                    <div className="small text-muted">Questions</div>
                    <div className="fw-bold">{paper.questions}</div>
                  </div>
                  <div className="col-3">
                    <div className="small text-muted">Duration</div>
                    <div className="fw-bold">{formatDuration(paper.duration)}</div>
                  </div>
                  <div className="col-3">
                    <div className="small text-muted">Rating</div>
                    <div className="fw-bold">
                      <Star size={14} className="text-warning me-1" />
                      {paper.rating}
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="small text-muted">Downloads</div>
                    <div className="fw-bold">{paper.downloadCount}</div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {paper.type === 'free' ? (
                      <span className="badge qsolve-free-badge">Free</span>
                    ) : (
                      <span className="fw-bold text-warning">₹{paper.price}</span>
                    )}
                  </div>
                  <button
                    className={`btn ${paper.type === 'free' ? 'btn-success' : 'btn-warning'}`}
                    onClick={() => handleDownload(paper)}
                  >
                    <FileDown size={16} className="me-1" />
                    {paper.type === 'free' ? 'Download' : 'Buy & Download'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="row">
          <div className="col-12">
            <nav aria-label="Question papers pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredAndSortedPapers.length === 0 && (
        <div className="row">
          <div className="col-12">
            <div className="text-center py-5">
              <FileDown size={64} className="text-muted mb-3" />
              <h4 className="text-muted">No question papers found</h4>
              <p className="text-muted">Try adjusting your search criteria or filters.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;