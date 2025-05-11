
import React from 'react';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { CategoryBanner } from '@/components/CategoryBanner';
import { CallToAction } from '@/components/CallToAction';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FeaturedProducts />
        <CategoryBanner />
        <CallToAction />
        <NewsletterSignup />
      </motion.div>
    </div>
  );
}
