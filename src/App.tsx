import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { QuickFilters } from './components/QuickFilters';
import { ActiveFilters } from './components/ActiveFilters';
import { FilterPanel } from './components/FilterPanel';
import { ProductCard } from './components/ProductCard';
import { CompareBar } from './components/CompareBar';
import { ComparisonModal } from './components/ComparisonModal';
import { EmptyState } from './components/EmptyState';
import { SkeletonCard } from './components/SkeletonCard';
import { ValueProposition } from './components/ValueProposition';
import { mockProducts } from './data/mockProducts';
import { FilterState, SortOption, Marketplace } from './types';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('best-value');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [marketplace, setMarketplace] = useState<Marketplace>('us');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    brands: [],
    priceRange: [0, 10000],
    minRating: 0,
    specs: {}
  });

  const filteredProducts = useMemo(() => {
    let products = mockProducts;

    if (filters.category !== 'all') {
      products = products.filter(p => p.category === filters.category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        Object.values(p.specs).some(spec =>
          spec.toLowerCase().includes(query)
        )
      );
    }

    if (filters.brands.length > 0) {
      products = products.filter(p => filters.brands.includes(p.brand));
    }

    products = products.filter(p =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.minRating > 0) {
      products = products.filter(p => p.rating >= filters.minRating);
    }

    if (Object.keys(filters.specs).length > 0) {
      products = products.filter(p => {
        return Object.entries(filters.specs).every(([key, values]) => {
          if (values.length === 0) return true;
          return values.some(value => p.specs[key] === value);
        });
      });
    }

    return products;
  }, [mockProducts, filters, searchQuery]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortBy) {
      case 'best-value':
        return products.sort((a, b) => {
          const aValue = a.pricePerUnit ? parseFloat(a.pricePerUnit.match(/[\d.]+/)?.[0] || '999999') : 999999;
          const bValue = b.pricePerUnit ? parseFloat(b.pricePerUnit.match(/[\d.]+/)?.[0] || '999999') : 999999;
          return aValue - bValue;
        });
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return products.sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  }, [filteredProducts, sortBy]);

  const availableBrands = useMemo(() => {
    const brands = new Set(
      mockProducts
        .filter(p => filters.category === 'all' || p.category === filters.category)
        .map(p => p.brand)
    );
    return Array.from(brands).sort();
  }, [filters.category]);

  const availableSpecs = useMemo(() => {
    if (filters.category === 'all') {
      return {};
    }

    const categorySpecKeys: Record<string, string[]> = {
      computers: ['processor', 'ram', 'storage', 'screen', 'type'],
      baby: ['ageRange', 'size', 'count', 'type'],
      cameras: ['sensor', 'resolution', 'lens', 'features', 'megapixels', 'video', 'screenSize', 'connectivity', 'range', 'type']
    };

    const allowedKeys = categorySpecKeys[filters.category] || [];
    const specs: Record<string, Set<string>> = {};
    const categoryProducts = mockProducts.filter(p => p.category === filters.category);

    categoryProducts.forEach(product => {
      Object.entries(product.specs).forEach(([key, value]) => {
        if (allowedKeys.includes(key)) {
          if (!specs[key]) specs[key] = new Set();
          specs[key].add(value);
        }
      });
    });

    const result: Record<string, string[]> = {};
    allowedKeys.forEach(key => {
      if (specs[key]) {
        result[key] = Array.from(specs[key]).sort();
      }
    });

    return result;
  }, [filters.category]);

  const handleToggleSelect = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleQuickFilter = (filterType: string, value: string) => {
    const newSpecs = { ...filters.specs };
    if (!newSpecs[filterType]) newSpecs[filterType] = [];

    if (newSpecs[filterType].includes(value)) {
      newSpecs[filterType] = newSpecs[filterType].filter(v => v !== value);
    } else {
      newSpecs[filterType] = [...newSpecs[filterType], value];
    }

    setFilters({ ...filters, specs: newSpecs });
  };

  const handleRemoveFilter = (type: string, value?: string) => {
    if (type === 'all') {
      setFilters({
        category: filters.category,
        brands: [],
        priceRange: [0, 10000],
        minRating: 0,
        specs: {}
      });
      return;
    }

    if (type === 'brand' && value) {
      setFilters({ ...filters, brands: filters.brands.filter(b => b !== value) });
    } else if (type === 'price') {
      setFilters({ ...filters, priceRange: [0, 10000] });
    } else if (type === 'rating') {
      setFilters({ ...filters, minRating: 0 });
    } else if (type === 'spec' && value) {
      const [key, val] = value.split(':');
      const newSpecs = { ...filters.specs };
      if (newSpecs[key]) {
        newSpecs[key] = newSpecs[key].filter(v => v !== val);
        if (newSpecs[key].length === 0) delete newSpecs[key];
      }
      setFilters({ ...filters, specs: newSpecs });
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'all',
      brands: [],
      priceRange: [0, 10000],
      minRating: 0,
      specs: {}
    });
  };

  const selectedProductsData = useMemo(() =>
    mockProducts.filter(p => selectedProducts.includes(p.id)),
    [selectedProducts]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-30 bg-white shadow-sm">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          marketplace={marketplace}
          onMarketplaceChange={setMarketplace}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <ValueProposition />
        <CategorySelector
          selectedCategory={filters.category}
          onCategoryChange={(category) => setFilters({ ...filters, category, specs: {} })}
        />
      </div>

      <QuickFilters
        category={filters.category}
        onQuickFilter={handleQuickFilter}
      />
      <ActiveFilters
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
      />

      <div className="max-w-[1920px] mx-auto">
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          availableBrands={availableBrands}
          availableSpecs={availableSpecs}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />

        <div className="lg:ml-64">
        <div className="flex-1 min-w-0">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden fixed bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3.5 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:shadow-xl transition-all hover:scale-105"
          >
            <Filter className="w-5 h-5" />
            <span className="font-semibold text-sm">Filters</span>
          </button>

          <div className="p-4 lg:p-6 pb-24">
            {isLoading ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : sortedProducts.length === 0 ? (
              <EmptyState onClearFilters={clearAllFilters} />
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {sortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      <CompareBar
        selectedProducts={selectedProductsData}
        onRemoveProduct={(id) => setSelectedProducts(prev => prev.filter(p => p !== id))}
        onClearAll={() => setSelectedProducts([])}
        onCompare={() => setShowComparison(true)}
      />

      {showComparison && (
        <ComparisonModal
          products={selectedProductsData}
          onClose={() => setShowComparison(false)}
          onClearSelection={() => {
            setSelectedProducts([]);
            setShowComparison(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
