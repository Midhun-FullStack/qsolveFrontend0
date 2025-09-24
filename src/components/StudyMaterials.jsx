import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BookOpen, Download, FileText, Package, Star, Clock, Users, Filter, Search } from 'lucide-react';
import { dataService } from '../services/dataService';

const StudyMaterials = ({ user }) => {
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundleProducts, setBundleProducts] = useState([]);
  const [bundleSubjects, setBundleSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  console.log("subjects :",bundleSubjects)

  // Fetch all bundles on component mount
  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    setLoading(true);
    try {
      console.log('Fetching bundles...');
      const data = await dataService.getBundles();
      console.log('Bundles response:', data);
      
      const transformedBundles = Array.isArray(data) ? data.map(bundle => ({
        id: bundle._id,
        title: bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
        departmentID: bundle.departmentID?._id || bundle.departmentID,
        departmentName: bundle.departmentID?.department || 'Unknown Department',
        price: bundle.price,
        products: bundle.products || [],
        productCount: bundle.products?.length || 0
      })) : [];
      
      console.log('Transformed bundles:', transformedBundles);
      setBundles(transformedBundles);
      
      if (transformedBundles.length === 0) {
        toast.info('No study materials found. Please check with administrator.');
      }
    } catch (error) {
      console.error('Failed to fetch bundles:', error);
      toast.error(`Failed to load study materials: ${error.message}`);
      
      // Fallback to mock data for testing
      const mockBundles = [
        {
          id: 'mock-1',
          title: 'Sample Engineering Bundle',
          departmentID: 'dept-1',
          price: 299,
          products: [],
          productCount: 5
        }
      ];
      setBundles(mockBundles);
    } finally {
      setLoading(false);
    }
  };

  const handleBundleSelect = async (bundle) => {
    setSelectedBundle(bundle);
    setLoading(true);
    
    try {
      console.log('Fetching bundle details for:', bundle);
      
      // Fetch products/PDFs for this bundle's department
      const productsData = await dataService.getPdfsByDepartment(bundle.departmentID);
      console.log('Products data:', productsData);
      setBundleProducts(productsData.products || []);
      
      // Fetch subjects for this bundle's department
      const subjectsData = await dataService.getSubjectsByDepartment(bundle.departmentID);
      console.log('Subjects data:', subjectsData);
      setBundleSubjects(Array.isArray(subjectsData) ? subjectsData : []);
      
      toast.success(`Loaded materials for ${bundle.title}`);
    } catch (error) {
      console.error('Failed to fetch bundle details:', error);
      toast.error(`Failed to load bundle details: ${error.message}`);
      
      // Set mock data for testing
      setBundleProducts([
        {
          _id: 'mock-product-1',
          title: 'Sample Study Material',
          description: 'This is a sample study material for testing',
          fileUrl: '/sample.pdf'
        }
      ]);
      setBundleSubjects([
        {
          name: 'Sample Subject',
          displayName: 'Sample Engineering Subject'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const   handleDownload = async (product) => {
    try {
      toast.success(`Downloaded: ${product.title}`);
      // TODO: Implement actual download logic
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = bundle.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'free' && bundle.price === 0) ||
      (filterType === 'paid' && bundle.price > 0);
    
    return matchesSearch && matchesFilter;
  });

  if (loading && bundles.length === 0) {
    return (
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading study materials...</p>
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
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Study Materials</h2>
              <p className="text-muted mb-0">Access your purchased bundles and study materials</p>
            </div>
            <Package size={40} className="text-primary opacity-75" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <Search size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search study materials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="col-md-3">
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Materials</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                
                <div className="col-md-3">
                  <div className="text-muted small">
                    {filteredBundles.length} bundles available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Bundles List */}
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Available Bundles</h5>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {filteredBundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    className={`list-group-item list-group-item-action ${
                      selectedBundle?.id === bundle.id ? 'active' : ''
                    }`}
                    onClick={() => handleBundleSelect(bundle)}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{bundle.title}</h6>
                        <small className="text-primary d-block">
                          <BookOpen size={12} className="me-1" />
                          {bundle.departmentName}
                        </small>
                        <small className="text-muted">
                          {bundle.productCount} materials
                        </small>
                      </div>
                      <div className="text-end">
                        {bundle.price === 0 ? (
                          <span className="badge bg-success">Free</span>
                        ) : (
                          <span className="fw-bold text-warning">₹{bundle.price}</span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Details */}
        <div className="col-lg-8">
          {selectedBundle ? (
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{selectedBundle.title}</h5>
                    <small className="text-muted">
                      <BookOpen size={14} className="me-1" />
                      {selectedBundle.departmentName}
                    </small>
                  </div>
                  <div>
                    {selectedBundle.price === 0 ? (
                      <span className="badge bg-success fs-6">Free Bundle</span>
                    ) : (
                      <span className="badge bg-warning fs-6">₹{selectedBundle.price}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Loading bundle contents...</p>
                  </div>
                ) : (
                  <>
                    {/* Subjects in Bundle */}
                  

                    {/* Products/Materials in Bundle */}
                    {bundleProducts.length > 0 ? (
                      <div>
                        <h6 className="text-primary mb-3">Study Materials ({bundleProducts.length})</h6>
                        <div className="row">
                          {bundleSubjects.map((subject) => (
                            <div key={subject._id} className="col-md-6 mb-3">
                              <div className="card border">
                                <div className="card-body">
                                  <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h6 className="card-title mb-1">{subject.subject}</h6>
                                    <FileText size={20} className="text-muted" />
                                  </div>
                                  
                                  <p className="card-text text-muted small mb-3">
                                    {subject.description || 'Study material'}
                                  </p>
                                  
                                  <div className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                      <Clock size={14} className="me-1" />
                                      PDF Document
                                    </small>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => handleDownload(product)}
                                    >
                                      <Download size={14} className="me-1" />
                                      Download
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <FileText size={48} className="text-muted mb-3" />
                        <h6 className="text-muted">No materials found</h6>
                        <p className="text-muted small">This bundle doesn't contain any materials yet.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center py-5">
                <Package size={64} className="text-muted mb-3" />
                <h5 className="text-muted">Select a Bundle</h5>
                <p className="text-muted">Choose a bundle from the left to view its study materials</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;