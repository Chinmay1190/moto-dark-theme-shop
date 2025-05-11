
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative bg-accent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                About SuperBikes
              </h1>
              <p className="text-muted-foreground mb-6">
                Founded in 2010, SuperBikes has become India's premier destination for high-performance motorcycles.
                Our passion for engineering excellence and riding culture drives everything we do.
              </p>
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://source.unsplash.com/random/800x600?motorcycle,showroom"
                alt="SuperBikes showroom"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground">
              From a small workshop to becoming India's leading superbike retailer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://source.unsplash.com/random/800x600?motorcycle,vintage"
                alt="Our Journey"
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            <div>
              <p className="mb-4">
                SuperBikes was founded by Raj Verma, a motorcycle enthusiast with a vision to bring the world's finest motorcycles to Indian roads. What started as a small workshop in Mumbai has grown into a nationwide network of premium dealerships.
              </p>
              <p className="mb-4">
                Our journey began with a simple belief: Indian riders deserve access to the best motorcycles in the world, supported by world-class service and expertise. This philosophy has guided our growth from a single brand dealership to representing over 15 global motorcycle manufacturers.
              </p>
              <p>
                Today, SuperBikes is recognized for its exceptional customer service, technical expertise, and passionate community of riders. We don't just sell motorcycles; we promote a lifestyle centered around performance, freedom, and the joy of riding.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose SuperBikes
            </h2>
            <p className="text-muted-foreground">
              We differentiate ourselves through unmatched expertise, selection, and service
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Knowledge",
                description: "Our staff includes experienced riders and certified technicians who understand every aspect of the machines we sell."
              },
              {
                title: "Premium Selection",
                description: "We offer India's widest range of high-performance motorcycles from the world's leading manufacturers."
              },
              {
                title: "After-Sales Support",
                description: "Our relationship doesn't end with your purchase. We provide ongoing maintenance, upgrades, and community events."
              },
              {
                title: "Financing Options",
                description: "Flexible payment plans and competitive rates make owning your dream bike more accessible."
              },
              {
                title: "Trade-In Program",
                description: "Ready to upgrade? Our fair trade-in program helps you transition to your next superbike."
              },
              {
                title: "Rider Community",
                description: "Join a passionate network of like-minded enthusiasts for group rides, track days, and exclusive events."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-2" />
                  <h3 className="text-lg font-medium">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground">
              Passionate experts dedicated to providing the ultimate superbike experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Raj Verma",
                role: "Founder & CEO",
                image: "https://source.unsplash.com/random/300x300?man,business"
              },
              {
                name: "Priya Singh",
                role: "Head of Operations",
                image: "https://source.unsplash.com/random/300x300?woman,business"
              },
              {
                name: "Amit Kumar",
                role: "Chief Mechanic",
                image: "https://source.unsplash.com/random/300x300?mechanic"
              },
              {
                name: "Neha Sharma",
                role: "Customer Relations",
                image: "https://source.unsplash.com/random/300x300?woman,professional"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Ready to Experience the Ultimate Ride?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/90">
            Visit one of our showrooms or browse our online collection to find your perfect superbike match.
            Our team is ready to assist you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" asChild className="bg-white text-primary border-white hover:bg-white/90">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-white border-white/30 hover:bg-white/20">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
