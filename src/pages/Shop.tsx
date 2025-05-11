
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  products,
  getAllBrands,
  getAllCategories,
  getMinMaxPrice 
} from '@/data/products';
import { ProductGrid } from '@/components/ProductGrid';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, FilterState, ProductCategory } from '@/types/product';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function Shop() {
  // Parse query params
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Get initial category from URL param if available
  const initialCategory = queryParams.get('category') as ProductCategory | null;
  const initialSearchQuery = queryParams.get('q') || '';
  const initialShowNew = queryParams.get('new') === 'true';
  
  // All available options
  const allBrands = getAllBrands();
  const allCategories = getAllCategories();
  const [minPrice, maxPrice] = getMinMaxPrice();
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [minPrice, maxPrice],
    brands: [],
    sortBy: 'price-low',
  });
  
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showNewOnly, setShowNewOnly] = useState(initialShowNew);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Mobile filter drawer state
  const [showFilters, setShowFilters] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseQuery) || 
          product.brand.toLowerCase().includes(lowercaseQuery) || 
          product.category.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by new only
    if (showNewOnly) {
      result = result.filter(product => product.new);
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category as ProductCategory));
    }
    
    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }
    
    // Apply price range filter
    result = result.filter(
      product => 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
    );
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL params
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (showNewOnly) params.set('new', 'true');
    if (filters.categories.length === 1) params.set('category', filters.categories[0]);
    
    navigate({ search: params.toString() }, { replace: true });
  }, [filters, searchQuery, showNewOnly, navigate]);
  
  // Toggle category filter
  const toggleCategory = (category: ProductCategory) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category],
      };
    });
  };
  
  // Toggle brand filter
  const toggleBrand = (brand: string) => {
    setFilters(prev => {
      const isSelected = prev.brands.includes(brand);
      return {
        ...prev,
        brands: isSelected
          ? prev.brands.filter(b => b !== brand)
          : [...prev.brands, brand],
      };
    });
  };
  
  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: [value[0], value[1]] }));
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters(prev => ({ ...prev, sortBy: value as "price-low" | "price-high" | "rating" | "newest" }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      brands: [],
      sortBy: 'price-low',
    });
    setSearchQuery('');
    setShowNewOnly(false);
  };
  
  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Page header */}
      <div className="bg-accent py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Shop Superbikes
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our extensive collection of performance motorcycles from the world's top manufacturers.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-sm">
                  Reset All
                </Button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    type="text"
                    placeholder="Search bikes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                  />
                  <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={filters.priceRange}
                  min={minPrice}
                  max={maxPrice}
                  step={50000}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
              
              {/* Brands */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Brands</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {allBrands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* New Products Only */}
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox
                    id="new-only"
                    checked={showNewOnly}
                    onCheckedChange={(checked) => setShowNewOnly(!!checked)}
                  />
                  <label
                    htmlFor="new-only"
                    className="ml-2 text-sm cursor-pointer"
                  >
                    New Arrivals Only
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {/* Mobile filter controls */}
            <div className="md:hidden flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="h-8 w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Mobile filter drawer */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 z-50 bg-background">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-4 overflow-y-auto h-[calc(100vh-56px)]">
                  {/* Search */}
                  <div className="mb-6">
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <Input
                        type="text"
                        placeholder="Search bikes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-8"
                      />
                      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </form>
                  </div>
                  
                  {/* Sort by (Mobile) */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Sort by</h3>
                    <Select value={filters.sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="rating">Best Rated</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`mobile-category-${category}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Price Range</h3>
                    <Slider
                      defaultValue={filters.priceRange}
                      min={minPrice}
                      max={maxPrice}
                      step={50000}
                      onValueChange={handlePriceRangeChange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                  
                  {/* Brands */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {allBrands.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`mobile-brand-${brand}`}
                            checked={filters.brands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                          />
                          <label
                            htmlFor={`mobile-brand-${brand}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* New Products Only */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-new-only"
                        checked={showNewOnly}
                        onCheckedChange={(checked) => setShowNewOnly(!!checked)}
                      />
                      <label
                        htmlFor="mobile-new-only"
                        className="ml-2 text-sm cursor-pointer"
                      >
                        New Arrivals Only
                      </label>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-8 flex gap-4">
                    <Button variant="outline" className="flex-1" onClick={resetFilters}>
                      Reset All
                    </Button>
                    <Button className="flex-1" onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Sort controls - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
              
              <Select value={filters.sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Active filters */}
            {(filters.categories.length > 0 || filters.brands.length > 0 || showNewOnly || searchQuery) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {searchQuery && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs flex items-center gap-1"
                    onClick={() => setSearchQuery('')}
                  >
                    Search: {searchQuery}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                {filters.categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs flex items-center gap-1"
                    onClick={() => toggleCategory(category)}
                  >
                    Category: {category}
                    <X className="h-3 w-3" />
                  </Button>
                ))}
                
                {filters.brands.map((brand) => (
                  <Button
                    key={brand}
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs flex items-center gap-1"
                    onClick={() => toggleBrand(brand)}
                  >
                    Brand: {brand}
                    <X className="h-3 w-3" />
                  </Button>
                ))}
                
                {showNewOnly && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs flex items-center gap-1"
                    onClick={() => setShowNewOnly(false)}
                  >
                    New Arrivals Only
                    <X className="h-3 w-3" />
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={resetFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductGrid products={filteredProducts} columns={3} />
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
