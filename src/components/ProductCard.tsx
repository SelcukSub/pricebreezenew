import { Star, ExternalLink, Plus, Check, Clock, MapPin } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

const getTimeAgo = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  return `${hours}h ago`;
};

const getMarketplace = () => {
  const markets = ['Amazon.com', 'Amazon.de', 'Amazon.co.uk'];
  return markets[Math.floor(Math.random() * markets.length)];
};

const formatCategoryName = (category: string): string => {
  const categoryNames: Record<string, string> = {
    'computers': 'Computers',
    'baby': 'Baby Products',
    'cameras': 'Cameras & Monitors'
  };
  return categoryNames[category] || category;
};

export function ProductCard({ product, isSelected, onToggleSelect }: ProductCardProps) {
  const timeAgo = getTimeAgo();
  const marketplace = getMarketplace();

  return (
    <div className="bg-white border border-gray-200 rounded-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group">
      <div className="flex gap-4 p-4">
        <div className="w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
                  {formatCategoryName(product.category)}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight text-base mb-1 group-hover:text-blue-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-xs font-medium text-gray-500">{product.brand}</p>
            </div>
            <div className="relative group/tooltip">
              <button
                onClick={() => onToggleSelect(product.id)}
                className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-110'
                    : 'border-gray-300 text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 hover:scale-105'
                }`}
                aria-label={isSelected ? 'Remove from compare' : 'Add to compare'}
              >
                {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <div className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
                {isSelected ? 'Remove from compare' : 'Add to compare'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-0.5 rounded">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-semibold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount.toLocaleString()})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
            {Object.entries(product.specs).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex items-baseline gap-1.5">
                <span className="text-xs text-gray-500 capitalize font-medium">{key}:</span>
                <span className="text-xs text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>
              {product.pricePerUnit && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                  <span className="text-sm font-bold text-green-700">
                    {product.pricePerUnit}
                  </span>
                </div>
              )}
            </div>

            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md text-sm whitespace-nowrap"
            >
              View on Amazon
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
