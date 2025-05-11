
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee, X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

export function CartDrawer() {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(cartTotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleCart}
          />
          
          {/* Cart drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Cart ({cartItems.length})
              </h2>
              <Button variant="ghost" size="icon" onClick={toggleCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Cart items */}
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-12 w-12 mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-muted-foreground mb-6">Start adding some awesome products!</p>
                  <Button onClick={toggleCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => {
                    const formattedPrice = new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }).format(item.product.price);
                    
                    const itemTotalPrice = new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0,
                    }).format(item.product.price * item.quantity);
                    
                    return (
                      <li key={item.product.id} className="flex border-b pb-4">
                        {/* Product image */}
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="flex-grow px-4">
                          <Link 
                            to={`/product/${item.product.id}`}
                            onClick={toggleCart}
                            className="font-medium hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.product.brand} • {item.product.category}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center border rounded-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6 p-0"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="ml-auto text-right">
                              <p className="font-medium">{itemTotalPrice}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity > 1 && `${formattedPrice} each`}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove button */}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeFromCart(item.product.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            
            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <div className="flex items-center font-bold text-lg">
                    <BadgeIndianRupee className="h-4 w-4 mr-1" />
                    {formattedTotal}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Shipping and taxes calculated at checkout
                </p>
                
                <div className="space-y-2">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/checkout" onClick={toggleCart}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={toggleCart}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
