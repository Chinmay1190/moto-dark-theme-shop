
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BadgeIndianRupee, CreditCard, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Form states
  const [formStep, setFormStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'upi'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  
  // Shipping fee and tax calculations
  const shippingFee = cartTotal > 100000 ? 0 : 1999;
  const taxRate = 0.18; // 18% GST
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingFee + taxAmount;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const { fullName, email, phone, address, city, state, pincode } = shippingInfo;
    if (!fullName || !email || !phone || !address || !city || !state || !pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Move to payment step
    setFormStep('payment');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStep('success');
      clearCart();
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };
  
  // If cart is empty, redirect to shop
  if (cartItems.length === 0 && formStep !== 'success') {
    return (
      <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">
          You need to add some items to your cart before checking out.
        </p>
        <Button onClick={() => navigate('/shop')}>
          Browse Products
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {formStep === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-heading font-bold mb-4">
              Order Confirmed!
            </h1>
            
            <p className="mb-8 text-muted-foreground">
              Thank you for your purchase. We've received your order and will begin processing it right away.
              You will receive a confirmation email shortly with all the details.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
              
              <Button variant="outline" onClick={() => navigate('/shop')}>
                Continue Shopping
              </Button>
            </div>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-heading font-bold mb-8 text-center">
              Checkout
            </h1>
            
            {/* Checkout steps indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    formStep === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-primary text-primary-foreground'
                  }`}>
                    1
                  </div>
                  <span className={`ml-2 ${formStep === 'shipping' ? 'text-foreground font-medium' : ''}`}>
                    Shipping
                  </span>
                </div>
                
                <div className={`w-12 h-0.5 mx-2 ${
                  formStep === 'shipping' ? 'bg-muted' : 'bg-primary'
                }`} />
                
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    formStep === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <span className={`ml-2 ${formStep === 'payment' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    Payment
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main content - Form */}
              <div className="md:col-span-2">
                {formStep === 'shipping' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                      
                      <form onSubmit={handleShippingSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              value={shippingInfo.fullName}
                              onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={shippingInfo.email}
                              onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="mb-4">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea
                            id="address"
                            value={shippingInfo.address}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={shippingInfo.city}
                              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              value={shippingInfo.state}
                              onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                              required
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="pincode">PIN Code *</Label>
                            <Input
                              id="pincode"
                              value={shippingInfo.pincode}
                              onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <Button type="submit" className="w-full sm:w-auto">
                            Continue to Payment
                          </Button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
                
                {formStep === 'payment' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
                      <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                      
                      <div className="p-4 bg-muted rounded-md text-sm">
                        <p className="font-medium">{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                        <p>Phone: {shippingInfo.phone}</p>
                        <p>Email: {shippingInfo.email}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4"
                        onClick={() => setFormStep('shipping')}
                      >
                        Edit Address
                      </Button>
                    </div>
                    
                    <div className="bg-card rounded-lg p-6 shadow-sm">
                      <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                      
                      <form onSubmit={handlePaymentSubmit}>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={(value) => setPaymentMethod(value as 'card' | 'cod' | 'upi')}
                          className="mb-6"
                        >
                          <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-grow cursor-pointer">
                              <div className="flex items-center">
                                <CreditCard className="h-5 w-5 mr-2" />
                                Credit / Debit Card
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-md p-4 mb-3">
                            <RadioGroupItem value="upi" id="upi" />
                            <Label htmlFor="upi" className="flex-grow cursor-pointer">
                              UPI Payment
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-md p-4">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod" className="flex-grow cursor-pointer">
                              Cash on Delivery
                            </Label>
                          </div>
                        </RadioGroup>
                        
                        {paymentMethod === 'card' && (
                          <div className="p-4 border rounded-md mb-6">
                            <div className="mb-4">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input
                                  id="expiryDate"
                                  placeholder="MM/YY"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {paymentMethod === 'upi' && (
                          <div className="p-4 border rounded-md mb-6">
                            <div>
                              <Label htmlFor="upiId">UPI ID</Label>
                              <Input
                                id="upiId"
                                placeholder="name@bank"
                                required
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-8">
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setFormStep('shipping')}
                          >
                            Back
                          </Button>
                          
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Order summary */}
              <div>
                <div className="bg-card rounded-lg p-6 shadow-sm sticky top-24">
                  <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                  
                  <div className="divide-y divide-border">
                    {cartItems.map((item) => {
                      const itemPrice = item.product.discountPrice || item.product.price;
                      const itemTotal = itemPrice * item.quantity;
                      
                      return (
                        <div key={item.product.id} className="flex py-4">
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex-grow">
                            <p className="font-medium line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.product.brand} • Qty: {item.quantity}
                            </p>
                          </div>
                          
                          <div className="ml-2 text-right">
                            <p className="font-medium">{formatPrice(itemTotal)}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-muted-foreground">
                                {formatPrice(itemPrice)} each
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>{formatPrice(taxAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between text-lg font-medium pt-2 border-t">
                      <span>Total</span>
                      <div className="flex items-center">
                        <BadgeIndianRupee className="h-4 w-4 mr-1" />
                        {formatPrice(orderTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
