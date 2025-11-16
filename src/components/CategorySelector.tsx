import { Monitor, Baby, Camera } from 'lucide-react';
import { FilterState } from '../types';

interface CategorySelectorProps {
  selectedCategory: FilterState['category'];
  onCategoryChange: (category: FilterState['category']) => void;
}

const categories = [
  { id: 'all' as const, label: 'All Products', icon: null },
  { id: 'computers' as const, label: 'Computers', icon: Monitor },
  { id: 'baby' as const, label: 'Baby Products', icon: Baby },
  { id: 'cameras' as const, label: 'Cameras & Monitors', icon: Camera },
];

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
