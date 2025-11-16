import { ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types';

interface SortBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultCount: number;
}

export function SortBar({ sortBy, onSortChange }: SortBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-end sticky top-[233px] lg:top-[225px] z-40">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600 hidden sm:inline">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium"
        >
          <option value="best-value">Best Value</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}
