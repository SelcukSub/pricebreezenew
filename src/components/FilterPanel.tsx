import { Star, X, ChevronDown, ChevronUp, DollarSign, Tag, Settings } from 'lucide-react';
import { useState } from 'react';
import { FilterState } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableBrands: string[];
  availableSpecs: Record<string, string[]>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterPanel({ filters, onFilterChange, availableBrands, availableSpecs, isOpen = true, onClose }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    brand: true,
    rating: true,
    specs: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (index: 0 | 1, value: string) => {
    const newRange: [number, number] = [...filters.priceRange];
    newRange[index] = value === '' ? (index === 0 ? 0 : 10000) : Number(value);
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const getCategorySpecLabels = (key: string) => {
    const labels: Record<string, string> = {
      processor: 'Processor',
      ram: 'RAM',
      storage: 'Storage',
      screen: 'Screen Size',
      type: 'Type',
      size: 'Size',
      count: 'Count',
      ageRange: 'Age Range',
      features: 'Features',
      megapixels: 'Megapixels',
      sensor: 'Sensor',
      video: 'Video Quality',
      lens: 'Lens',
      resolution: 'Resolution',
      range: 'Range',
      screenSize: 'Screen Size',
      connectivity: 'Connectivity'
    };
    return labels[key] || key;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div className={`w-64 bg-white p-6 space-y-6
        fixed top-0 left-0 h-full z-50 transition-transform duration-300 overflow-y-auto
        lg:static lg:h-auto lg:overflow-visible lg:bg-transparent lg:p-0 lg:space-y-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="lg:hidden flex items-center justify-between mb-4 p-0">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

      <div className="space-y-6 lg:space-y-6">
        <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
            <h3 className="font-bold text-gray-900">Price Range</h3>
          </div>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.price && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceRange[0] || ''}
            onChange={(e) => handlePriceChange(0, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceRange[1] === 10000 ? '' : filters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        )}
        </div>

      <div>
        <button
          onClick={() => toggleSection('brand')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
            <h3 className="font-bold text-gray-900">Brand</h3>
          </div>
          {expandedSections.brand ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.brand && (
        <div className="space-y-2">
          {availableBrands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition-colors group"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
            <h3 className="font-bold text-gray-900">Minimum Rating</h3>
          </div>
          {expandedSections.rating ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expandedSections.rating && (
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map(rating => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => onFilterChange({ ...filters, minRating: rating })}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-700">{rating}+</span>
              </div>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
            <input
              type="radio"
              name="rating"
              checked={filters.minRating === 0}
              onChange={() => onFilterChange({ ...filters, minRating: 0 })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Any rating</span>
          </label>
        </div>
        )}
      </div>

      {Object.keys(availableSpecs).length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('specs')}
            className="w-full flex items-center justify-between mb-3 hover:text-blue-600 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
              <h3 className="font-bold text-gray-900">Specifications</h3>
            </div>
            {expandedSections.specs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.specs && (
          <>
          {Object.entries(availableSpecs).map(([specKey, values]) => (
            <div key={specKey} className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {getCategorySpecLabels(specKey)}
              </h4>
              <div className="space-y-2">
                {values.map(value => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={filters.specs[specKey]?.includes(value) || false}
                      onChange={(e) => {
                        const newSpecs = { ...filters.specs };
                        if (!newSpecs[specKey]) newSpecs[specKey] = [];
                        if (e.target.checked) {
                          newSpecs[specKey] = [...newSpecs[specKey], value];
                        } else {
                          newSpecs[specKey] = newSpecs[specKey].filter(v => v !== value);
                        }
                        onFilterChange({ ...filters, specs: newSpecs });
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          </>
          )}
        </div>
      )}

      <button
        onClick={() => onFilterChange({
          category: filters.category,
          brands: [],
          priceRange: [0, 10000],
          minRating: 0,
          specs: {}
        })}
        className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Clear All Filters
      </button>
      </div>
      </div>
    </>
  );
}
