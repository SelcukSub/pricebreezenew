import { Search, ShoppingCart, ChevronDown, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Marketplace, MarketplaceInfo, SortOption } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  marketplace: Marketplace;
  onMarketplaceChange: (marketplace: Marketplace) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const marketplaces: MarketplaceInfo[] = [
  { id: 'us', name: 'Amazon.com', domain: 'amazon.com', flag: '🇺🇸', currency: '$' },
  { id: 'de', name: 'Amazon.de', domain: 'amazon.de', flag: '🇩🇪', currency: '€' },
  { id: 'uk', name: 'Amazon.co.uk', domain: 'amazon.co.uk', flag: '🇬🇧', currency: '£' },
  { id: 'fr', name: 'Amazon.fr', domain: 'amazon.fr', flag: '🇫🇷', currency: '€' },
  { id: 'jp', name: 'Amazon.co.jp', domain: 'amazon.co.jp', flag: '🇯🇵', currency: '¥' },
];

export function Header({ searchQuery, onSearchChange, marketplace, onMarketplaceChange, sortBy, onSortChange }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedMarketplace = marketplaces.find(m => m.id === marketplace) || marketplaces[0];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShoppingCart className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600" />
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">PriceBreeze</h1>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ArrowUpDown className="w-4 h-4 text-gray-400 hidden md:block" />
            <span className="text-sm text-gray-600 hidden md:inline">Sort by:</span>
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

          <div className="relative flex-shrink-0">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 lg:px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl">{selectedMarketplace.flag}</span>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                {selectedMarketplace.domain}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                  {marketplaces.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        onMarketplaceChange(m.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        m.id === marketplace ? 'bg-blue-50' : ''
                      }`}
                    >
                      <span className="text-2xl">{m.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900 text-sm">{m.name}</div>
                        <div className="text-xs text-gray-500">{m.domain}</div>
                      </div>
                      {m.id === marketplace && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { marketplaces };
