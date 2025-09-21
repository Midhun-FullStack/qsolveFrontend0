import { useState } from 'react';
import { toast } from 'react-toastify';
import { dataService } from '../services/dataService';

const ApiTest = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (name, apiCall) => {
    setLoading(true);
    try {
      console.log(`Testing ${name}...`);
      const result = await apiCall();
      console.log(`${name} result:`, result);
      setResults(prev => ({ ...prev, [name]: { success: true, data: result } }));
      toast.success(`${name} - Success`);
    } catch (error) {
      console.error(`${name} error:`, error);
      setResults(prev => ({ 
        ...prev, 
        [name]: { 
          success: false, 
          error: error.message,
          status: error.response?.status,
          data: error.response?.data 
        } 
      }));
      toast.error(`${name} - Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    await testEndpoint('Bundles', () => dataService.getBundles());
    await testEndpoint('Subjects', () => dataService.getSubjects());
    await testEndpoint('Question Banks', () => dataService.getQuestionBanks());
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">API Test Dashboard</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <button 
                  className="btn btn-primary me-2" 
                  onClick={runAllTests}
                  disabled={loading}
                >
                  {loading ? 'Testing...' : 'Run All Tests'}
                </button>
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setResults({})}
                >
                  Clear Results
                </button>
              </div>
              
              <div className="row">
                {Object.entries(results).map(([name, result]) => (
                  <div key={name} className="col-md-4 mb-3">
                    <div className={`card ${result.success ? 'border-success' : 'border-danger'}`}>
                      <div className="card-header">
                        <h6 className={`mb-0 ${result.success ? 'text-success' : 'text-danger'}`}>
                          {name} {result.success ? '✅' : '❌'}
                        </h6>
                      </div>
                      <div className="card-body">
                        {result.success ? (
                          <div>
                            <small className="text-muted">
                              Count: {Array.isArray(result.data) ? result.data.length : 'N/A'}<br/>
                              Sample: {JSON.stringify(result.data).substring(0, 150)}...
                            </small>
                            {name === 'Bundles' && Array.isArray(result.data) && result.data.length > 0 && (
                              <div className="mt-2">
                                <small className="text-info">
                                  First bundle department: {result.data[0].departmentID?.department || 'No department'}
                                </small>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <small className="text-danger">
                              Error: {result.error}<br/>
                              Status: {result.status}<br/>
                              Response: {JSON.stringify(result.data)}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;