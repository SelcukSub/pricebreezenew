import { FilterState } from '../types';

interface QuickFiltersProps {
  category: FilterState['category'];
  onQuickFilter: (filterType: string, value: string) => void;
}

const quickFiltersByCategory = {
  computers: [
    { label: 'Laptops', type: 'type', value: 'Laptop' },
    { label: 'Desktops', type: 'type', value: 'Desktop' },
    { label: 'Mini PCs', type: 'type', value: 'Mini PC' },
  ],
  baby: [
    { label: 'Diapers', type: 'type', value: 'Diapers' },
    { label: 'Playards', type: 'type', value: 'Playard' },
    { label: 'Size 1', type: 'size', value: 'Size 1' },
    { label: 'Size 2', type: 'size', value: 'Size 2' },
  ],
  cameras: [
    { label: 'Baby Monitors', type: 'type', value: 'Baby Monitor' },
    { label: 'Mirrorless', type: 'sensor', value: 'APS-C' },
    { label: '4K Video', type: 'video', value: '4K 30fps' },
    { label: 'WiFi', type: 'connectivity', value: 'WiFi' },
  ],
};

export function QuickFilters({ category, onQuickFilter }: QuickFiltersProps) {
  if (category === 'all') return null;

  const filters = quickFiltersByCategory[category] || [];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Quick filters:</span>
          {filters.map((filter) => (
            <button
              key={`${filter.type}-${filter.value}`}
              onClick={() => onQuickFilter(filter.type, filter.value)}
              className="px-4 py-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-blue-300"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
