
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllCategories } from '@/data/products';
import { ProductCategory } from '@/types/product';

interface CategoryCardProps {
  category: ProductCategory;
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  const imageUrls: Record<ProductCategory, string> = {
    "Sport": "https://source.unsplash.com/random/800x600?sportbike",
    "Cruiser": "https://source.unsplash.com/random/800x600?cruiser,motorcycle",
    "Adventure": "https://source.unsplash.com/random/800x600?adventure,motorcycle",
    "Naked": "https://source.unsplash.com/random/800x600?naked,motorcycle",
    "Touring": "https://source.unsplash.com/random/800x600?touring,motorcycle",
    "Electric": "https://source.unsplash.com/random/800x600?electric,motorcycle",
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[category]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative h-60 rounded-lg overflow-hidden group"
      style={backgroundImageStyle}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
      
      <Link to={`/shop?category=${category}`} className="block absolute inset-0">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h3 className="text-2xl font-heading font-bold mb-2">{category}</h3>
          <span className="inline-flex items-center text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            Explore
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                repeat: Infinity, 
                repeatDelay: 1,
                duration: 1,
                ease: "easeInOut" 
              }}
            >
              <path d="m9 18 6-6-6-6"/>
            </motion.svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function CategoryBanner() {
  const categories = getAllCategories();
  
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover the perfect superbike based on your riding style and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {categories.map((category, index) => (
            <CategoryCard key={category} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
