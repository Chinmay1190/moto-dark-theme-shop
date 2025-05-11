
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductGrid } from './ProductGrid';
import { getFeaturedProducts } from '@/data/products';
import { ChevronRight } from 'lucide-react';

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts(4);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              Featured Superbikes
            </h2>
            <p className="text-muted-foreground">
              Handpicked machines designed for peak performance and style.
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center mt-4 md:mt-0" asChild>
            <Link to="/shop">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <ProductGrid products={featuredProducts} columns={4} />
        
        <div className="mt-8 flex justify-center md:hidden">
          <Button asChild>
            <Link to="/shop">View All Bikes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
