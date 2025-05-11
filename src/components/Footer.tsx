
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    "Shop": [
      { name: "All Bikes", path: "/shop" },
      { name: "Sport Bikes", path: "/shop?category=Sport" },
      { name: "Cruisers", path: "/shop?category=Cruiser" },
      { name: "Adventure", path: "/shop?category=Adventure" },
      { name: "New Arrivals", path: "/shop?new=true" },
    ],
    "Support": [
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faqs" },
      { name: "Shipping & Returns", path: "/shipping" },
      { name: "Warranty", path: "/warranty" },
      { name: "Service Centers", path: "/service" },
    ],
    "Company": [
      { name: "About Us", path: "/about" },
      { name: "Blog", path: "/blog" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Privacy Policy", path: "/privacy" },
    ]
  };
  
  const socialLinks = [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "YouTube", url: "#" },
  ];
  
  return (
    <footer className="bg-primary text-white py-12 mt-20">
      <div className="container mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
          {/* Logo and about */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="font-heading text-3xl text-white">SuperBikes</span>
            </Link>
            <p className="text-white/80 mb-4 max-w-md">
              Experience the thrill of riding with SuperBikes, India's premium destination for high-performance motorcycles. Quality, performance, and passion in every ride.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-heading text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-8 pt-8 px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 mb-4 md:mb-0">
            &copy; {currentYear} SuperBikes India. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-white/70 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
