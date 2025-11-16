import { X, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onClearSelection: () => void;
}

const getCategorySpecs = (category: string): string[] => {
  switch (category) {
    case 'computers':
      return ['processor', 'ram', 'storage'];
    case 'baby':
      return ['ageRange', 'size', 'count'];
    case 'cameras':
      return ['sensor', 'resolution', 'video'];
    default:
      return [];
  }
};

const getSpecLabel = (key: string): string => {
  const labels: Record<string, string> = {
    processor: 'CPU',
    ram: 'RAM',
    storage: 'Storage',
    screen: 'Screen',
    type: 'Type',
    ageRange: 'Age Range',
    size: 'Size',
    count: 'Count',
    sensor: 'Sensor',
    resolution: 'Resolution',
    video: 'Video',
    megapixels: 'Megapixels',
    lens: 'Lens',
    features: 'Features'
  };
  return labels[key] || key;
};

export function ComparisonModal({ products, onClose, onClearSelection }: ComparisonModalProps) {
  if (products.length === 0) return null;

  const category = products[0].category;
  const relevantSpecs = getCategorySpecs(category);

  const allSpecKeys = new Set<string>();
  products.forEach(product => {
    Object.keys(product.specs).forEach(key => {
      if (relevantSpecs.includes(key)) {
        allSpecKeys.add(key);
      }
    });
  });

  const specKeys = relevantSpecs.filter(key => allSpecKeys.has(key));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Compare Products</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900 border-b border-gray-200 w-48">
                  Specification
                </th>
                {products.map(product => (
                  <th key={product.id} className="p-4 border-b border-gray-200 min-w-[250px]">
                    <div className="space-y-3">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Price
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center border-b border-gray-200">
                    <div className="text-2xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.pricePerUnit && (
                      <div className="text-sm text-green-700 font-medium mt-1">
                        {product.pricePerUnit}
                      </div>
                    )}
                  </td>
                ))}
              </tr>

              <tr className="bg-yellow-50">
                <td className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Rating
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center border-b border-gray-200">
                    <div className="text-lg font-semibold text-gray-900">
                      {product.rating} / 5.0
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.reviewCount.toLocaleString()} reviews
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="bg-white">
                <td className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Brand
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center border-b border-gray-200">
                    <span className="text-gray-900 font-medium">{product.brand}</span>
                  </td>
                ))}
              </tr>

              {specKeys.map((specKey, index) => (
                <tr key={specKey} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-gray-700 border-b border-gray-200">
                    {getSpecLabel(specKey)}
                  </td>
                  {products.map(product => (
                    <td key={product.id} className="p-4 text-center border-b border-gray-200">
                      <span className="text-gray-900 font-medium">
                        {product.specs[specKey] || '—'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="bg-white">
                <td className="p-4 font-semibold text-gray-900 border-b border-gray-200">
                  Action
                </td>
                {products.map(product => (
                  <td key={product.id} className="p-4 text-center border-b border-gray-200">
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                    >
                      View on Amazon
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            onClick={() => {
              onClearSelection();
              onClose();
            }}
            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Clear Selection
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
