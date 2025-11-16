import { X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CompareBarProps {
  selectedProducts: Product[];
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  onCompare: () => void;
}

export function CompareBar({ selectedProducts, onRemoveProduct, onClearAll, onCompare }: CompareBarProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-blue-600 shadow-2xl z-50 animate-slide-up">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-base font-bold text-gray-900">
                {selectedProducts.length} {selectedProducts.length === 1 ? 'product' : 'products'} selected
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {selectedProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900 max-w-[200px] truncate">
                    {product.title}
                  </span>
                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClearAll}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-semibold transition-colors hover:underline"
            >
              Clear
            </button>
            <button
              onClick={onCompare}
              disabled={selectedProducts.length < 2}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
            >
              Compare Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
