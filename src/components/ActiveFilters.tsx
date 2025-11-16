import { X } from 'lucide-react';
import { FilterState } from '../types';

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveFilter: (type: string, value?: string) => void;
}

export function ActiveFilters({ filters, onRemoveFilter }: ActiveFiltersProps) {
  const activeFilters: Array<{ type: string; label: string; value?: string }> = [];

  if (filters.brands.length > 0) {
    filters.brands.forEach(brand => {
      activeFilters.push({ type: 'brand', label: `Brand: ${brand}`, value: brand });
    });
  }

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
    const label = filters.priceRange[0] > 0 && filters.priceRange[1] < 10000
      ? `Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`
      : filters.priceRange[0] > 0
      ? `Price: > $${filters.priceRange[0]}`
      : `Price: < $${filters.priceRange[1]}`;
    activeFilters.push({ type: 'price', label });
  }

  if (filters.minRating > 0) {
    activeFilters.push({ type: 'rating', label: `Rating: ${filters.minRating}+ stars` });
  }

  Object.entries(filters.specs).forEach(([key, values]) => {
    values.forEach(value => {
      activeFilters.push({ type: 'spec', label: `${key}: ${value}`, value: `${key}:${value}` });
    });
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200 px-4 lg:px-6 py-3.5 shadow-sm">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900">Active filters:</span>
          {activeFilters.map((filter, index) => (
            <button
              key={`${filter.type}-${index}`}
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-blue-700 rounded-full text-sm font-semibold hover:bg-blue-100 transition-all shadow-sm hover:shadow border border-blue-200"
            >
              {filter.label}
              <X className="w-3.5 h-3.5" />
            </button>
          ))}
          <button
            onClick={() => onRemoveFilter('all')}
            className="text-sm text-blue-700 hover:text-blue-900 font-semibold underline ml-2 hover:no-underline transition-all"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
