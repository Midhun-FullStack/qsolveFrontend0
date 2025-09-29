import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, LockKeyhole, EyeOff, Eye, User, ChevronLeft } from 'lucide-react';

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
    
    // Clear validation error when user starts typing
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
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-primary">
      <div className="row w-100 justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4 rounded bg-white text-dark">
              <button 
                type="button" 
                className="btn btn-link p-0 mb-3 text-decoration-none"
                onClick={handleBack}
              >
                <ChevronLeft size={20} className="me-1" />
                Back
              </button>
              
              <div className="text-center mb-4">
                <h2 className="qsolve-brand mb-2">Q SOLVE</h2>
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
                        className={`form-control ${validationErrors.name ? 'is-invalid' : ''} bg-white`}
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
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''} bg-white`}
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
                        className={`form-control ${validationErrors.password ? 'is-invalid' : ''} bg-white`}
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
                        className={`form-control ${validationErrors.confirmPassword ? 'is-invalid' : ''} bg-white`}
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
  );
};

export default AuthForm;