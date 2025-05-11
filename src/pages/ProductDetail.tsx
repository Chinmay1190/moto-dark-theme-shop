
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductById, getRelatedProducts } from '@/data/products';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BadgeIndianRupee, ShoppingCart, ChevronLeft, ChevronRight, MinusCircle, PlusCircle, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(parseInt(id || "1"));
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  
  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the product you're looking for.
        </p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }
  
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
  
  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="py-4 mb-4">
          <nav className="flex text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link 
              to={`/shop?category=${product.category}`} 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {product.category}
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground font-medium">
              {product.name}
            </span>
          </nav>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={product.images[selectedImage]}
                  alt={`${product.name} - Image ${selectedImage + 1}`}
                  className="object-cover w-full h-full"
                />
              </AnimatePresence>
              
              {/* Navigation arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background text-foreground"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background text-foreground"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-colors ${
                    index === selectedImage ? 'border-primary' : 'border-transparent hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <span className="inline-block text-sm text-muted-foreground mb-2">
                {product.brand} • {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500 mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <div className="flex items-baseline mb-6">
                <div className="flex items-center text-2xl font-bold">
                  <BadgeIndianRupee className="h-5 w-5 mr-1" />
                  {formattedDiscountPrice || formattedPrice}
                </div>
                
                {formattedDiscountPrice && (
                  <span className="ml-3 text-lg text-muted-foreground line-through">
                    {formattedPrice}
                  </span>
                )}
                
                {formattedDiscountPrice && (
                  <span className="ml-3 text-sm text-green-600 font-medium">
                    Save {Math.round((1 - product.discountPrice! / product.price) * 100)}%
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
            </div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-3 py-1 rounded-full border ${
                      selectedColor === color 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-muted hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && <Check className="h-4 w-4 inline mr-1" />}
                    {color}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                
                <span className="w-12 text-center font-medium">
                  {quantity}
                </span>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
                
                <span className="ml-4 text-sm text-muted-foreground">
                  {product.stock > 10 ? (
                    'In Stock'
                  ) : product.stock > 0 ? (
                    `Only ${product.stock} left in stock!`
                  ) : (
                    'Out of Stock'
                  )}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button
                variant="outline"
                size="lg"
                className="font-medium"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                size="lg" 
                className="font-medium"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Product tabs */}
            <Tabs defaultValue="specs">
              <TabsList className="w-full">
                <TabsTrigger value="specs" className="flex-1">Specifications</TabsTrigger>
                <TabsTrigger value="shipping" className="flex-1">Shipping & Returns</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specs" className="pt-4">
                <ul className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key} className="flex justify-between py-1 border-b border-border last:border-0">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="shipping" className="pt-4">
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium">Free Delivery Across India</h4>
                    <p className="text-muted-foreground">
                      We offer free delivery to all major cities across India. Delivery time is typically
                      between 3-7 business days depending on your location.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">30-Day Returns</h4>
                    <p className="text-muted-foreground">
                      Not satisfied with your purchase? You can return it within 30 days for a full refund.
                      The item must be in its original condition and packaging.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Warranty</h4>
                    <p className="text-muted-foreground">
                      All our superbikes come with a standard manufacturer's warranty. Extended warranty options
                      are available at additional cost.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
            You May Also Like
          </h2>
          
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </div>
    </div>
  );
}
