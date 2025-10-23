import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { dataService } from '../services/dataService';
import StudyMaterialsHero from './StudyMaterialsHero';
import AdvancedFilters from './AdvancedFilters';
import BundleGrid from './BundleGrid';
import BundleDetailView from './BundleDetailViewRedesigned';

const StudyMaterials = () => {
  const [searchParams] = useSearchParams();
  // Simplified state management
  const [bundles, setBundles] = useState([]);
  const [filteredBundles, setFilteredBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [bundleProducts, setBundleProducts] = useState([]);
  const [bundleSubjects, setBundleSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showBundleDetail, setShowBundleDetail] = useState(false);

  const [bookmarkedBundles, setBookmarkedBundles] = useState([]);

  const [userAccess, setUserAccess] = useState({}); // Store user access data for bundles
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    minRating: '',
    sortBy: 'popular'
  });
  const [stats, setStats] = useState({ bundles: 0, downloads: 25, students: 10 });

  // Fetch bundles and user access on component mount
  useEffect(() => {
    fetchBundles();
    fetchUserAccess();
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const departmentParam = searchParams.get('department');
    const bundleParam = searchParams.get('bundle');

    if (bundles.length > 0) {
      if (departmentParam) {
        const bundleWithDept = bundles.find(bundle => bundle.departmentID === departmentParam);
        if (bundleWithDept) {
          setFilters(prev => ({ ...prev, category: bundleWithDept.departmentName }));
          toast.info(`Showing materials for ${bundleWithDept.departmentName}`);
        }
      }

      if (bundleParam && !selectedBundle) {
        const bundleToShow = bundles.find(bundle => (bundle.id || bundle._id) === bundleParam);
        if (bundleToShow) handleBundleSelect(bundleToShow);
      }
    }
  }, [searchParams, bundles, selectedBundle]);

  // Apply filters when bundles, search term, or filters change
  useEffect(() => {
    applyFilters();
  }, [bundles, searchTerm, filters]);

  const fetchUserAccess = async () => {
    try {
      console.log('Fetching user access data...');
      const accessData = await dataService.getUserAccess();
      console.log('User access response:', accessData);

      // Transform access data into a lookup object by bundle ID
      const accessLookup = {};
      if (Array.isArray(accessData)) {
        accessData.forEach(access => {
          if (access.bundleId) {
            accessLookup[access.bundleId] = {
              hasAccess: true,
              expiryDate: access.expiryDate,
              grantedBy: access.grantedBy,
              grantedAt: access.grantedAt
            };
          }
        });
      }
      setUserAccess(accessLookup);
    } catch (error) {
      console.error('Failed to fetch user access:', error);
      // For demo purposes, create mock access data
      const mockAccess = {
        'mock-1': { hasAccess: true, expiryDate: '2025-12-31', grantedBy: 'Admin', grantedAt: '2024-01-01' },
        'mock-3': { hasAccess: true, expiryDate: '2025-06-30', grantedBy: 'System', grantedAt: '2024-01-01' }
      };
      setUserAccess(mockAccess);
    }
  };

  const fetchBundles = async () => {
    setLoading(true);
    try {
      console.log('Fetching bundles...');
      const data = await dataService.getBundles();
      console.log('Bundles response:', data);

      const transformedBundles = Array.isArray(data) ? data.map(bundle => ({
        id: bundle._id,
        title: bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
        name: bundle.title || `${bundle.departmentID?.department || 'Unknown'} Bundle`,
        departmentID: bundle.departmentID?._id || bundle.departmentID,
        departmentName: bundle.departmentID?.department || 'Unknown Department',
        price: bundle.price,
        products: bundle.products || [],
        productCount: bundle.products?.length || 0,
        rating: 4.5 + Math.random() * 0.5, // Mock rating
        description: bundle.description || `Comprehensive study materials for ${bundle.departmentID?.department || 'this subject'} with detailed explanations and practice questions.`
      })) : [];

      console.log('Transformed bundles:', transformedBundles);
      setBundles(transformedBundles);
      setStats(prev => ({ ...prev, bundles: transformedBundles.length }));

      if (transformedBundles.length === 0) {
        // Fallback to mock data for demo
        const mockBundles = [
          {
            id: 'mock-1',
            title: 'JEE Main Complete Package',
            name: 'JEE Main Complete Package',
            departmentID: 'dept-1',
            departmentName: 'Engineering',
            price: 2999,
            products: [],
            productCount: 15,
            rating: 4.8,
            description: 'Comprehensive JEE Main preparation with 5000+ practice questions, detailed solutions, and expert video explanations.'
          },
          {
            id: 'mock-2',
            title: 'NEET Biology Mastery',
            name: 'NEET Biology Mastery',
            departmentID: 'dept-2',
            departmentName: 'Medical',
            price: 1999,
            products: [],
            productCount: 12,
            rating: 4.9,
            description: 'Complete biology preparation for NEET with detailed notes, diagrams, and practice questions.'
          },
          {
            id: 'mock-3',
            title: 'Free Mathematics Basics',
            name: 'Free Mathematics Basics',
            departmentID: 'dept-3',
            departmentName: 'Mathematics',
            price: 0,
            products: [],
            productCount: 8,
            rating: 4.6,
            description: 'Essential mathematics concepts with step-by-step solutions and practice problems.'
          },
          {
            id: 'mock-4',
            title: 'Physics Fundamentals',
            name: 'Physics Fundamentals',
            departmentID: 'dept-4',
            departmentName: 'Science',
            price: 1799,
            products: [],
            productCount: 10,
            rating: 4.7,
            description: 'Master physics concepts with interactive problems and detailed explanations.'
          },
          {
            id: 'mock-5',
            title: 'Chemistry Complete Guide',
            name: 'Chemistry Complete Guide',
            departmentID: 'dept-5',
            departmentName: 'Science',
            price: 1899,
            products: [],
            productCount: 14,
            rating: 4.8,
            description: 'Comprehensive chemistry preparation with organic, inorganic, and physical chemistry.'
          },
          {
            id: 'mock-6',
            title: 'Commerce Essentials',
            name: 'Commerce Essentials',
            departmentID: 'dept-6',
            departmentName: 'Commerce',
            price: 0,
            products: [],
            productCount: 6,
            rating: 4.4,
            description: 'Essential commerce concepts for board exam preparation.'
          }
        ];
        setBundles(mockBundles);
        setStats(prev => ({ ...prev, bundles: mockBundles.length }));
        toast.info('Showing demo study materials');
      }
    } catch (error) {
      console.error('Failed to fetch bundles:', error);
      toast.error(`Failed to load study materials: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bundles];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(bundle =>
        bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bundle.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(bundle =>
        bundle.departmentName.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange) {
      if (filters.priceRange === 'free') {
        filtered = filtered.filter(bundle => bundle.price === 0);
      } else if (filters.priceRange === '0-500') {
        filtered = filtered.filter(bundle => bundle.price > 0 && bundle.price <= 500);
      } else if (filters.priceRange === '500-1000') {
        filtered = filtered.filter(bundle => bundle.price > 500 && bundle.price <= 1000);
      } else if (filters.priceRange === '1000-2000') {
        filtered = filtered.filter(bundle => bundle.price > 1000 && bundle.price <= 2000);
      } else if (filters.priceRange === '2000+') {
        filtered = filtered.filter(bundle => bundle.price > 2000);
      }
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(bundle => bundle.rating >= filters.minRating);
    }

    // Sort
    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => b.id.localeCompare(a.id));
    } else if (filters.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredBundles(filtered);
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

      setShowBundleDetail(true);
      toast.success(`Loaded materials for ${bundle.title}`);
    } catch (error) {
      console.error('Failed to fetch bundle details:', error);

      // Set mock data for demo
      const mockSubjects = [
        {
          _id: 'subject-1',
          subject: `${bundle.departmentName} Fundamentals`,
          description: 'Core concepts and fundamentals'
        },
        {
          _id: 'subject-2',
          subject: `Advanced ${bundle.departmentName}`,
          description: 'Advanced topics and problem solving'
        },
        {
          _id: 'subject-3',
          subject: `${bundle.departmentName} Practice Papers`,
          description: 'Previous year questions and mock tests'
        }
      ];
      setBundleSubjects(mockSubjects);
      setBundleProducts([]);
      setShowBundleDetail(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBundlePreview = (bundle) => {
    toast.info(`Previewing ${bundle.title}`);
    handleBundleSelect(bundle);
  };

  const handleDownload = async (material) => {
    // Check if user has access to the selected bundle
    const bundleId = selectedBundle?.id || selectedBundle?._id;
    const access = userAccess[bundleId];

    if (!access?.hasAccess) {
      toast.error('Access required to download materials');
      return;
    }

    // Check if access has expired
    if (access.expiryDate && new Date(access.expiryDate) < new Date()) {
      toast.error('Your access has expired. Contact administrator to renew.');
      return;
    }

    const getUrl = (m) => m?.fileUrl || m?.url || m?.path || m?.file?.url || m?.file?.path || null;
    const getName = (m, idx = 0) => {
      return (m?.originalName || m?.filename || m?.title || m?.subject || `download-${idx + 1}`).replace(/[^a-zA-Z0-9.\- _]/g, '_');
    };

    const downloadFromUrl = async (url, filename) => {
      try {
        // Try fetching the resource as a blob (works when CORS allows it)
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
        return true;
      } catch (err) {
        // Fallback: try opening the URL in a new tab so browser can handle download (may prompt or navigate)
        try {
          window.open(url, '_blank');
          return true;
        } catch (e) {
          console.error('Download failed fallback:', e);
          return false;
        }
      }
    };

    try {
      // If a bundle object was passed (has files array), download all files sequentially
      if (material && (Array.isArray(material.files) || Array.isArray(material.products))) {
        const items = material.files || material.products || [];
        if (items.length === 0) {
          toast.info('No files available for download in this bundle.');
          return;
        }
        toast.info('Preparing downloads...');
        for (let i = 0; i < items.length; i++) {
          const file = items[i];
          const url = getUrl(file) || getUrl(material);
          const name = getName(file, i);
          if (!url) {
            toast.warning(`Skipping file ${name}: no URL`);
            continue;
          }
          // sequential to avoid many parallel fetches
          const ok = await downloadFromUrl(url, name);
          if (ok) toast.success(`Downloaded: ${name}`);
          else toast.error(`Failed to download: ${name}`);
          // small delay between downloads
          await new Promise(r => setTimeout(r, 300));
        }
        return;
      }

      // Single material download
      const url = getUrl(material);
      const filename = getName(material);
      if (!url) {
        toast.error('No downloadable file found for this item');
        return;
      }
      const ok = await downloadFromUrl(url, filename);
      if (ok) toast.success(`Downloaded: ${filename}`);
      else toast.error('Download failed');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Download failed');
    }
  };

  const handleViewAccess = (bundle) => {
    // Show access information instead of purchase
    setSelectedBundle(bundle);
    setShowBundleDetail(true);
    toast.info(`Viewing access details for ${bundle.title}`);
  };

  const handleBookmarkToggle = (bundle) => {
    const bundleId = bundle.id || bundle._id;
    setBookmarkedBundles(prev => {
      if (prev.includes(bundleId)) {
        toast.info('Removed from bookmarks');
        return prev.filter(id => id !== bundleId);
      } else {
        toast.success('Added to bookmarks');
        return [...prev, bundleId];
      }
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? '' : value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      minRating: '',
      sortBy: 'popular'
    });
    setSearchTerm('');
  };

  const handleRequestAccess = async (bundle) => {
    try {
      console.log('Submitting access request for bundle:', bundle);

      // Submit the access request directly using user's stored details
      const requestData = {
        bundleId: bundle.id || bundle._id,
        bundleName: bundle.title || bundle.name,
        requestedAt: new Date().toISOString()
      };

      await dataService.submitAccessRequest(requestData);

      toast.success(`Access request submitted for ${bundle.title || bundle.name}. You'll receive an email confirmation shortly.`);
    } catch (error) {
      console.error('Failed to submit access request:', error);
      if (error.response?.status === 409) {
        toast.warning('You have already requested access to this bundle. Please wait for admin approval.');
      } else if (error.response?.status === 401) {
        toast.error('Please log in to request access to study materials.');
      } else {
        toast.error('Failed to submit access request. Please try again.');
      }
    }
  };



  return (
    <div className="study-materials-modern">
      {/* Hero Section */}
      <StudyMaterialsHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={() => setShowFilters(true)}
        stats={stats}
      />

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Bundle Grid */}
      <BundleGrid
        bundles={filteredBundles}
        loading={loading}
        onBundleSelect={handleBundleSelect}
        onBundlePreview={handleBundlePreview}
        onViewAccess={handleViewAccess}
        onRequestAccess={handleRequestAccess}
        onBookmarkToggle={handleBookmarkToggle}
        bookmarkedBundles={bookmarkedBundles}
        userAccess={userAccess}
      />

      {/* Bundle Detail View */}
      <BundleDetailView
        isOpen={showBundleDetail}
        onClose={() => setShowBundleDetail(false)}
        bundle={selectedBundle}
        materials={bundleProducts}
        subjects={bundleSubjects}
        onDownload={handleDownload}
        onBookmarkToggle={handleBookmarkToggle}
        isBookmarked={selectedBundle && bookmarkedBundles.includes(selectedBundle.id || selectedBundle._id)}
        userAccess={selectedBundle ? userAccess[selectedBundle.id || selectedBundle._id] : null}
        onRequestAccess={handleRequestAccess}
        loading={loading}
      />


    </div>
  );
};

export default StudyMaterials;