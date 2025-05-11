
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, BadgeIndianRupee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);
  
  const formattedDiscountPrice = product.discountPrice 
    ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.discountPrice)
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-56">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-10" />
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        {/* Status badges */}
        <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
          {product.new && (
            <Badge variant="default" className="bg-primary text-primary-foreground">New</Badge>
          )}
          {product.featured && (
            <Badge variant="outline" className="bg-background text-foreground">Featured</Badge>
          )}
          {product.stock <= 2 && product.stock > 0 && (
            <Badge variant="destructive">Low Stock</Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="outline" className="bg-muted text-muted-foreground">Out of Stock</Badge>
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category and brand */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <span className="text-xs font-medium">{product.brand}</span>
        </div>
        
        {/* Title */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        {/* Specs (brief) */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
          {product.specs.engine}
        </p>
        
        {/* Price and rating */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-center text-lg font-medium">
            <BadgeIndianRupee className="h-4 w-4 mr-1 text-primary" />
            {formattedDiscountPrice ? (
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span>{formattedDiscountPrice}</span>
                  <span className="ml-2 text-sm line-through text-muted-foreground">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            ) : (
              <span>{formattedPrice}</span>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button
          className="w-full mt-4"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </motion.div>
  );
}
