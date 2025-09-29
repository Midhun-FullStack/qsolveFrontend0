import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import FeaturedBundles from './FeaturedBundles';

import CTASection from './CTASection';

const HomePage = ({ subjects, bundles = [], user }) => {
  const navigate = useNavigate();

  const handleBundleClick = (bundle) => {
    navigate('/study-materials');
    toast.info(`Viewing study materials for ${bundle.name}`);
  };

  const handleViewAllMaterials = () => {
    navigate('/study-materials');
    toast.success('Exploring all study materials');
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/study-materials');
    } else {
      navigate('/auth');
      toast.info('Please sign in to get started');
    }
  };

  return (
    <div className="homepage-modern">
      {/* Hero Section */}
      

      {/* Featured Bundles */}
      <FeaturedBundles 
        bundles={bundles} 
        onBundleClick={handleBundleClick} 
      />

      {/* Testimonials */}
      

      {/* Call to Action */}
      <CTASection onViewAllMaterials={handleViewAllMaterials} />
    </div>
  );
};

export default HomePage;