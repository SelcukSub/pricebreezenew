import { Clock } from 'lucide-react';
import { Marketplace } from '../types';
import { marketplaces } from './Header';

interface ProductListHeaderProps {
  count: number;
  marketplace: Marketplace;
  lastUpdated?: string;
}

export function ProductListHeader({ count, marketplace, lastUpdated = '2 hours ago' }: ProductListHeaderProps) {
  const marketplaceInfo = marketplaces.find(m => m.id === marketplace);

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-gray-900">
            {count} {count === 1 ? 'product' : 'products'} found
          </span>
          {marketplaceInfo && (
            <>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-600">
                Prices from <span className="font-medium text-gray-900">{marketplaceInfo.name}</span>
              </span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span>Prices last updated {lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
