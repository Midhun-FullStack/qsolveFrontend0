import { useState } from 'react';
import { Download, Lock, FileText } from 'lucide-react';
import PaymentForm from './PaymentForm';

const PDFDownload = () => {
  const [isPaid, setIsPaid] = useState(false);

  const pdfs = [
    {
      id: 1,
      name: 'Mathematics Study Guide',
      description: 'Comprehensive mathematics formulas and practice problems',
      filename: 'sample1.pdf'
    },
    {
      id: 2,
      name: 'Physics Fundamentals',
      description: 'Essential physics concepts and problem-solving techniques',
      filename: 'sample2.pdf'
    }
  ];

  const handlePaymentSuccess = () => {
    setIsPaid(true);
  };

  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/pdfs/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <FileText size={48} className="text-primary mb-3" />
            <h2 className="display-5 fw-bold mb-3" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Study Materials
            </h2>
            <p className="lead text-muted">
              Access premium PDF study materials with secure payment
            </p>
          </div>

          {!isPaid ? (
            <div className="mb-5">
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            </div>
          ) : (
            <div className="text-center mb-4">
              <div className="alert alert-success d-inline-block" style={{
                background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                border: '1px solid #c3e6cb',
                borderRadius: '0.5rem'
              }}>
                <h5 className="alert-heading mb-2">
                  <Lock size={20} className="me-2" />
                  PDFs Unlocked!
                </h5>
                <p className="mb-0">You can now download all study materials.</p>
              </div>
            </div>
          )}

          <div className="row g-4">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="col-md-6">
                <div className="card h-100 shadow-sm" style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '1rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex align-items-center mb-3">
                      <FileText size={24} className="text-primary me-3" />
                      <div>
                        <h5 className="card-title mb-1">{pdf.name}</h5>
                        <small className="text-muted">{pdf.description}</small>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <button
                        className={`btn w-100 ${isPaid ? 'btn-success' : 'btn-outline-secondary'}`}
                        disabled={!isPaid}
                        onClick={() => handleDownload(pdf.filename)}
                        style={{
                          borderRadius: '0.5rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isPaid ? (
                          <>
                            <Download size={18} className="me-2" />
                            Download PDF
                          </>
                        ) : (
                          <>
                            <Lock size={18} className="me-2" />
                            Payment Required
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="p-3 rounded" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h6 className="text-primary mb-2">Secure Payment</h6>
                  <p className="small text-muted mb-0">All transactions are encrypted and secure</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded" style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h6 className="text-primary mb-2">Instant Access</h6>
                  <p className="small text-muted mb-0">Download materials immediately after payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFDownload;
