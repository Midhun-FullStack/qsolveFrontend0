import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BookOpen, FileDown, Star, Clock, Users, Package } from 'lucide-react';

const HomePage = ({ subjects, bundles = [], user }) => {
  const navigate = useNavigate();
  console.log(bundles)


  const handleBundleClick = (bundle) => {
    navigate('/study-materials');
    toast.info(`Viewing study materials`);
  };

  const handleViewAllMaterials = () => {
    navigate('/study-materials');
  };







  if (!bundles || bundles.length === 0) {
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




  return (
    <div className="container-fluid py-4">

      <div className="row mb-5">
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


  <div className="row">
  {bundles.map((bundle) => (
    <div
      className="col-12 col-md-6 mb-4 shadow-lg"
      key={bundle.id}
    >
      <div className="card h-100 shadow-sm border-0 rounded-3 p-3 d-flex flex-column">
        
        {/* Title + Price */}
        <h5 className="text-primary fw-bold mb-1">
          {bundle.name}
        </h5>
        <p className="text-muted mb-2">₹{bundle.price}</p>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <Star size={16} className="text-warning me-1" />
          <small className="text-muted">
            {bundle.rating || "4.5"} / 5
          </small>
        </div>

        {/* Description */}
        <p className="text-secondary small flex-grow-1">
          {bundle.description ||
            "This bundle contains high-quality study materials designed to help you prepare effectively."}
        </p>

        {/* Buttons */}
        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-sm btn-outline-primary flex-fill"
            onClick={() => handleBundleClick(bundle)}
          >
            Sample Pages
          </button>
          <button
            className="btn btn-sm btn-primary text-white flex-fill"
            onClick={() => handleBundleClick(bundle)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
<div className="mt-5 p-5 bg-primary text-white rounded-3 text-center">
  <h3 className="fw-bold text-white mb-3">Keep Learning with QSolve!</h3>
  <p className="mb-4">
    Explore more bundles, question papers, and study materials to boost your preparation.
  </p>
  <button
    className="btn btn-light text-primary fw-bold"
    onClick={handleViewAllMaterials}
  >
    View All Materials
  </button>
</div>





    </div>
  );
};

export default HomePage;