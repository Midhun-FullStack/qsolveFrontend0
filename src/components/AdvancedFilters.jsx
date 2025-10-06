import { X, SlidersHorizontal, Star, DollarSign, Clock, BookOpen } from 'lucide-react';

const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange,
  onClearFilters 
}) => {
  const priceRanges = [
    { label: 'Free', value: 'free' },
    { label: 'Under ₹500', value: '0-500' },
    { label: '₹500 - ₹1000', value: '500-1000' },
    { label: '₹1000 - ₹2000', value: '1000-2000' },
    { label: 'Above ₹2000', value: '2000+' }
  ];

  const categories = [
    { label: 'Engineering', value: 'engineering', icon: BookOpen },
    { label: 'Medical', value: 'medical', icon: BookOpen },
    { label: 'Commerce', value: 'commerce', icon: BookOpen },
    { label: 'Arts', value: 'arts', icon: BookOpen },
    { label: 'Science', value: 'science', icon: BookOpen }
  ];

  const sortOptions = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' }
  ];

  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="glass-card rounded-3 p-4 m-3" style={{ maxWidth: '600px', width: '100%', maxHeight: '80vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <SlidersHorizontal size={24} style={{ color: '#1a365d' }} className="me-2" />
            <h5 className="mb-0 fw-bold" style={{ color: '#1a365d' }}>Advanced Filters</h5>
          </div>
          <button 
            className="btn btn-outline-secondary btn-sm rounded-circle p-2"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3" style={{ color: '#1a365d' }}>Categories</h6>
          <div className="row g-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.value} className="col-6">
                  <button
                    className={`btn w-100 d-flex align-items-center justify-content-start p-3 ${
                      filters.category === category.value 
                        ? 'btn-primary' 
                        : 'btn-outline-primary'
                    }`}
                    onClick={() => onFilterChange('category', category.value)}
                  >
                    <IconComponent size={16} className="me-2" />
                    {category.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3" style={{ color: '#1a365d' }}>Price Range</h6>
          <div className="d-flex flex-wrap gap-2">
            {priceRanges.map((range) => (
              <button
                key={range.value}
                className={`btn btn-sm ${
                  filters.priceRange === range.value 
                    ? 'btn-success' 
                    : 'btn-outline-success'
                } rounded-pill`}
                onClick={() => onFilterChange('priceRange', range.value)}
              >
                <DollarSign size={14} className="me-1" />
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3" style={{ color: '#1a365d' }}>Minimum Rating</h6>
          <div className="d-flex gap-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`btn btn-sm d-flex align-items-center ${
                  filters.minRating === rating 
                    ? 'btn-warning' 
                    : 'btn-outline-warning'
                } rounded-pill`}
                onClick={() => onFilterChange('minRating', rating)}
              >
                <Star size={14} className="me-1" />
                {rating}+ Stars
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-3" style={{ color: '#1a365d' }}>Sort By</h6>
          <select
            className="form-select"
            value={filters.sortBy || 'popular'}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary flex-fill"
            onClick={onClearFilters}
          >
            Clear All
          </button>
          <button 
            className="btn qsolve-btn-primary flex-fill"
            onClick={onClose}
          >
            Apply Filters
          </button>
        </div>

        {/* Active Filters Count */}
        {Object.values(filters).filter(Boolean).length > 0 && (
          <div className="mt-3 text-center">
            <small className="text-muted">
              {Object.values(filters).filter(Boolean).length} filter(s) active
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilters;