import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FeaturedBundles from './FeaturedBundles';
import TestimonialsSection from './TestimonialsSection';
import Hero from './Hero';
import { fetchBundles } from '../store/slices/dataSlice';

const HomePage = () => {
  const { bundles, loading } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch bundles if not already loaded
  useEffect(() => {
    if (!bundles || bundles.length === 0) {
      dispatch(fetchBundles());
    }
  }, [bundles, dispatch]);

  const handleBundleClick = (bundle) => {
    navigate(`/study-materials?bundle=${bundle.id || bundle._id}`);
  };

  return (
    <div>
      <Hero />
      <FeaturedBundles
        bundles={bundles}
        onBundleClick={handleBundleClick}
        loading={loading}
      />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;