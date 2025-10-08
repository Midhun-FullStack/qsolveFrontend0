import { useState } from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const PaymentForm = ({ onPaymentSuccess, onSuccess }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    // CVV validation
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
    else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Card number validation (16 digits)
    const cardNumberDigits = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberDigits || cardNumberDigits.length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiryDate || !expiryRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    } else {
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    // CVV validation (3-4 digits)
    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing delay (1-2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      // Call either callback if provided to support different prop names
      if (typeof onPaymentSuccess === 'function') onPaymentSuccess();
      if (typeof onSuccess === 'function') onSuccess();
    }, 1500);
  };

  if (isPaid) {
    return (
      <div className="text-center py-5">
        <CheckCircle size={64} className="text-success mb-3" />
        <h3 className="text-success mb-3">Payment Successful!</h3>
        <p className="text-muted">PDFs are now unlocked and ready for download.</p>
      </div>
    );
  }

  return (
    <div className="payment-form-container d-flex justify-content-center py-4">
      <div className="card shadow-lg border-0" style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fb 100%)',
        borderRadius: '1rem',
        maxWidth: '540px',
        width: '100%'
      }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CreditCard size={34} className="text-white" />
            </div>
            <h4 className="card-title mt-3 mb-2">Complete Payment</h4>
            <p className="text-muted small">Enter your card details to unlock PDF downloads</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label fw-semibold">
                Card Number
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <CreditCard size={18} />
                </span>
                <input
                  type="text"
                  className={`form-control bg-white text-dark ${errors.cardNumber ? 'is-invalid' : ''}`}
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  disabled={isProcessing}
                  style={{ borderLeft: 'none' }}
                />
                {errors.cardNumber && (
                  <div className="invalid-feedback">{errors.cardNumber}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="expiryDate" className="form-label fw-semibold">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className={`form-control bg-white text-dark ${errors.expiryDate ? 'is-invalid' : ''}`}
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  disabled={isProcessing}
                />
                {errors.expiryDate && (
                  <div className="invalid-feedback">{errors.expiryDate}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label fw-semibold">
                  CVV
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <Lock size={18} />
                  </span>
                  <input
                    type="password"
                    className={`form-control bg-white text-dark ${errors.cvv ? 'is-invalid' : ''}`}
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    disabled={isProcessing}
                    style={{ borderLeft: 'none' }}
                  />
                  {errors.cvv && (
                    <div className="invalid-feedback">{errors.cvv}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isProcessing}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '0.5rem'
                }}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={18} className="me-2" />
                    Pay & Unlock PDFs
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted d-block">
              <Lock size={14} className="me-1" />
              Your payment information is secure and encrypted
            </small>
            <button className="btn btn-link mt-2" onClick={() => { if (typeof onCancel === 'function') onCancel(); }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
