
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 md:h-auto">
              <img
                src="https://source.unsplash.com/random/800x600?superbike,racing"
                alt="Premium superbike"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent md:hidden" />
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  Ready for the Ultimate Riding Experience?
                </h2>
                <p className="mb-6 text-primary-foreground/90">
                  From thrilling sportbikes to comfortable tourers, we offer the finest selection of performance motorcycles in India. Shop now and experience the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-medium bg-white text-primary border-white hover:bg-white/90 hover:text-primary"
                    asChild
                  >
                    <Link to="/shop">
                      Start Shopping
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-medium border-white/30 text-white hover:bg-white/20"
                    asChild
                  >
                    <Link to="/financing">
                      <BadgeIndianRupee className="mr-2 h-5 w-5" /> Financing Options
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
