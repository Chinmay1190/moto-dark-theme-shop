
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-transparent to-background h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://source.unsplash.com/random/1920x1080?superbike,motorcycle,speed" 
          alt="Superbike" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Unleash the Power of Performance
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 md:pr-12">
            Experience the thrill of riding with SuperBikes, India's premium destination for high-performance motorcycles. Find your perfect ride today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="font-semibold">
              <Link to="/shop">
                Shop All Bikes <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut" 
        }}
      >
        <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
