import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, LockKeyhole, EyeOff, Eye, User, ChevronLeft } from 'lucide-react';

// Add this CSS directly in the component file or in a separate .css file
const styles = `
  .container-fluid {
    background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
    animation: gradientShift 15s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .card {
    background: #1a1a1a !important;
    border: 1px solid #2a2a2a !important;
  }

  .form-label, .card-title, .text-dark {
    color: #ffffff !important;
  }

  .form-control {
    background: #2a2a2a !important;
    color: #ffffff !important;
    border: 1px solid #3a3a3a !important;
  }

  .form-control::placeholder {
    color: #aaaaaa !important;
  }

  .input-group-text {
    background: #2a2a2a !important;
    color: #ffffff !important;
    border: 1px solid #3a3a3a !important;
  }

  .qsolve-btn-primary {
    background-color: #00cc00 !important;
    border-color: #00cc00 !important;
    color: #ffffff !important;
    transition: background-color 0.3s ease;
  }

  .qsolve-btn-primary:hover {
    background-color: #00b300 !important;
    border-color: #00b300 !important;
  }

  .btn-link {
    color: #00cc00 !important;
  }

  .btn-link:hover {
    color: #00b300 !important;
  }

  .invalid-feedback {
    color: #ff4d4d !important;
  }

  .spinner-border {
    border-color: #00cc00 !important;
    border-right-color: transparent !important;
  }
`;

const AuthForm = ({ formType, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (formType === 'register') {
      if (!formData.name) {
        errors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        toast.success(`${formType === 'login' ? 'Login' : 'Registration'} successful!`);
        navigate('/home');
      } else {
        toast.error(result.error || 'Authentication failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (formType === 'login' || formType === 'register') {
      navigate('/landing');
    } else {
      navigate('/login');
    }
  };

  const getFormTitle = () => {
    switch (formType) {
      case 'login': return 'Sign In';
      case 'register': return 'Sign Up';
      case 'forgot-password': return 'Forgot Password';
      case 'reset-password': return 'Reset Password';
      case 'verification': return 'Verify Account';
      default: return 'Authentication';
    }
  };

  const getSubmitButtonText = () => {
    switch (formType) {
      case 'login': return 'Sign In';
      case 'register': return 'Sign Up';
      case 'forgot-password': return 'Send Reset Link';
      case 'reset-password': return 'Reset Password';
      case 'verification': return 'Verify';
      default: return 'Submit';
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4 rounded">
                <button 
                  type="button" 
                  className="btn btn-link p-0 mb-3 text-decoration-none"
                  onClick={handleBack}
                >
                  <ChevronLeft size={20} className="me-1" />
                  Back
                </button>
                
                <div className="text-center mb-4">
                  <h2 className="mb-2" style={{ color: '#ffffff', fontFamily: 'Space Grotesk, Inter, sans-serif', fontWeight: 700, fontSize: '1.75rem' }}>Q SOLVE</h2>
                  <h4 className="card-title">{getFormTitle()}</h4>
                </div>

                <form onSubmit={handleSubmit}>
                  {formType === 'register' && (
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />
                        {validationErrors.name && (
                          <div className="invalid-feedback">{validationErrors.name}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>
                      <input
                        type="email"
                        className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {validationErrors.email && (
                        <div className="invalid-feedback">{validationErrors.email}</div>
                      )}
                    </div>
                  </div>

                  {formType !== 'forgot-password' && formType !== 'verification' && (
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <LockKeyhole size={18} />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {validationErrors.password && (
                          <div className="invalid-feedback">{validationErrors.password}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {formType === 'register' && (
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <LockKeyhole size={18} />
                        </span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          className={`form-control ${validationErrors.confirmPassword ? 'is-invalid' : ''}`}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {validationErrors.confirmPassword && (
                          <div className="invalid-feedback">{validationErrors.confirmPassword}</div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn qsolve-btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Loading...
                        </>
                      ) : (
                        getSubmitButtonText()
                      )}
                    </button>
                  </div>
                </form>

                {formType === 'login' && (
                  <div className="text-center mt-3">
                    <small>
                      <button 
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => navigate('/forgot-password')}
                      >
                        Forgot Password?
                      </button>
                    </small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;