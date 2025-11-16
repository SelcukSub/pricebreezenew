export interface Product {
  id: string;
  title: string;
  image: string;
  category: 'computers' | 'baby' | 'cameras';
  brand: string;
  price: number;
  pricePerUnit?: string;
  rating: number;
  reviewCount: number;
  specs: Record<string, string>;
  amazonUrl: string;
}

export interface FilterState {
  category: 'all' | 'computers' | 'baby' | 'cameras';
  brands: string[];
  priceRange: [number, number];
  minRating: number;
  specs: Record<string, string[]>;
}

export type SortOption = 'best-value' | 'price-asc' | 'price-desc' | 'rating-desc';

export type Marketplace = 'us' | 'de' | 'uk' | 'fr' | 'jp';

export interface MarketplaceInfo {
  id: Marketplace;
  name: string;
  domain: string;
  flag: string;
  currency: string;
}
