
import { Product, ProductCategory } from "../types/product";

// Function to generate placeholder image URL
const generateImage = (id: number, variant: number = 0) => 
  `https://source.unsplash.com/random/800x600?superbike,motorcycle&${id}-${variant}`;

// Helper to generate random stock number
const randomStock = () => Math.floor(Math.random() * 10) + 1;

// Helper to generate random rating between 3.5 and 5
const randomRating = () => Number((Math.random() * 1.5 + 3.5).toFixed(1));

// Helper to generate random review count
const randomReviews = () => Math.floor(Math.random() * 100) + 10;

// Brands
const brands = [
  "Kawasaki", "Ducati", "BMW", "Honda", "Yamaha", 
  "Suzuki", "KTM", "Aprilia", "Triumph", "Harley-Davidson",
  "Royal Enfield", "TVS", "Bajaj", "Hero", "MV Agusta"
];

// Categories
const categories: ProductCategory[] = ["Sport", "Cruiser", "Adventure", "Naked", "Touring", "Electric"];

// Product generation
export const products: Product[] = [
  // Sport bikes (20 products)
  {
    id: 1,
    name: "Ninja ZX-10R",
    brand: "Kawasaki",
    category: "Sport",
    price: 1599000,
    description: "The Ninja ZX-10R is the flagship superbike from Kawasaki featuring cutting-edge technology and race-derived features for maximum performance.",
    specs: {
      engine: "998cc, Liquid-cooled, 4-stroke, In-line Four",
      power: "203 PS @ 13,500 rpm",
      torque: "114.9 Nm @ 11,200 rpm",
      weight: "207 kg",
      seatHeight: "835 mm",
      fuelCapacity: "17 litres"
    },
    colors: ["Lime Green", "Black", "White"],
    images: [
      generateImage(1, 1),
      generateImage(1, 2),
      generateImage(1, 3)
    ],
    rating: 4.8,
    reviewCount: 84,
    stock: randomStock(),
    featured: true
  },
  {
    id: 2,
    name: "Panigale V4",
    brand: "Ducati",
    category: "Sport",
    price: 2395000,
    description: "The Panigale V4 represents the essence of Ducati sportbikes with its unique combination of power, design, and technology.",
    specs: {
      engine: "1103cc, Desmosedici Stradale V4",
      power: "214 PS @ 13,000 rpm",
      torque: "124 Nm @ 10,000 rpm",
      weight: "195 kg",
      seatHeight: "830 mm",
      fuelCapacity: "16 litres"
    },
    colors: ["Ducati Red", "Winter Test Livery", "Dark Stealth"],
    images: [
      generateImage(2, 1),
      generateImage(2, 2),
      generateImage(2, 3)
    ],
    rating: 4.9,
    reviewCount: 56,
    stock: randomStock(),
    featured: true
  },
  {
    id: 3,
    name: "S 1000 RR",
    brand: "BMW",
    category: "Sport",
    price: 1995000,
    description: "The S 1000 RR features German engineering excellence with industry-leading electronics and premium build quality.",
    specs: {
      engine: "999cc, Water/Oil-cooled inline 4-cylinder",
      power: "207 PS @ 13,500 rpm",
      torque: "113 Nm @ 11,000 rpm",
      weight: "197 kg",
      seatHeight: "824 mm",
      fuelCapacity: "16.5 litres"
    },
    colors: ["Racing Red/Light White/Black", "Black Storm Metallic", "Hockenheim Silver Metallic"],
    images: [
      generateImage(3, 1),
      generateImage(3, 2),
      generateImage(3, 3)
    ],
    rating: 4.8,
    reviewCount: 62,
    stock: randomStock(),
    featured: true
  },
  {
    id: 4,
    name: "CBR 1000RR-R Fireblade",
    brand: "Honda",
    category: "Sport",
    price: 2348000,
    description: "The CBR 1000RR-R Fireblade is Honda's flagship superbike with MotoGP-inspired aerodynamics and technology.",
    specs: {
      engine: "999.9cc, Liquid-cooled, inline 4-cylinder",
      power: "217.5 PS @ 14,500 rpm",
      torque: "113 Nm @ 12,500 rpm",
      weight: "201 kg",
      seatHeight: "831 mm",
      fuelCapacity: "16.1 litres"
    },
    colors: ["Grand Prix Red", "Matte Pearl Morion Black", "Tricolor"],
    images: [
      generateImage(4, 1),
      generateImage(4, 2),
      generateImage(4, 3)
    ],
    rating: 4.7,
    reviewCount: 48,
    stock: randomStock()
  },
  {
    id: 5,
    name: "YZF R1",
    brand: "Yamaha",
    category: "Sport",
    price: 1995000,
    description: "The YZF R1 features Yamaha's crossplane crankshaft technology and sophisticated electronics for exceptional performance.",
    specs: {
      engine: "998cc, Liquid-cooled, 4-stroke, crossplane 4-cylinder",
      power: "200 PS @ 13,500 rpm",
      torque: "112.4 Nm @ 11,500 rpm",
      weight: "200 kg",
      seatHeight: "855 mm",
      fuelCapacity: "17 litres"
    },
    colors: ["Yamaha Blue", "Tech Black", "Icon Blue"],
    images: [
      generateImage(5, 1),
      generateImage(5, 2),
      generateImage(5, 3)
    ],
    rating: 4.7,
    reviewCount: 58,
    stock: randomStock()
  },

  // Generate additional 60 products to reach 65 total
  ...Array.from({ length: 60 }, (_, i) => {
    const id = i + 6;
    const brandIndex = id % brands.length;
    const categoryIndex = id % categories.length;
    const brand = brands[brandIndex];
    const category = categories[categoryIndex];
    
    // Price ranges by category (in INR)
    const priceRanges = {
      "Sport": [1200000, 2500000],
      "Cruiser": [1000000, 2000000],
      "Adventure": [1300000, 2300000],
      "Naked": [900000, 1800000],
      "Touring": [1500000, 2800000],
      "Electric": [800000, 1500000]
    };
    
    const [minPrice, maxPrice] = priceRanges[category];
    const price = Math.round(Math.random() * (maxPrice - minPrice) + minPrice);
    
    // Model names by category
    const modelPrefixes = {
      "Sport": ["Ninja", "Panigale", "GSX-R", "Fireblade", "YZF-R"],
      "Cruiser": ["Vulcan", "Fat", "Rebel", "V-Star", "Scout"],
      "Adventure": ["Versys", "Multistrada", "GS", "Africa Twin", "Ténéré"],
      "Naked": ["Z", "Monster", "CB", "MT", "Duke"],
      "Touring": ["Concours", "Gold Wing", "K1600", "GTR", "FJR"],
      "Electric": ["LiveWire", "Zero", "Ultraviolette", "Ather", "Tork"]
    };
    
    const modelNumbers = ["650", "750", "900", "1000", "1100", "1200"];
    const prefixIndex = id % modelPrefixes[category].length;
    const numberIndex = id % modelNumbers.length;
    
    const name = `${modelPrefixes[category][prefixIndex]} ${modelNumbers[numberIndex]}`;
    
    // Engine sizes and specs by category
    const engineSpecs = {
      "Sport": {
        engine: `${800 + id % 400}cc, Liquid-cooled, 4-stroke, In-line Four`,
        power: `${140 + id % 80} PS @ ${12000 + id % 2000} rpm`,
        torque: `${90 + id % 30} Nm @ ${10000 + id % 2000} rpm`,
        weight: `${180 + id % 30} kg`,
      },
      "Cruiser": {
        engine: `${1200 + id % 600}cc, Air/Liquid-cooled, V-Twin`,
        power: `${90 + id % 40} PS @ ${8000 + id % 2000} rpm`,
        torque: `${120 + id % 40} Nm @ ${6000 + id % 1500} rpm`,
        weight: `${250 + id % 50} kg`,
      },
      "Adventure": {
        engine: `${800 + id % 500}cc, Liquid-cooled, Parallel Twin`,
        power: `${95 + id % 45} PS @ ${9000 + id % 2000} rpm`,
        torque: `${100 + id % 30} Nm @ ${7500 + id % 1500} rpm`,
        weight: `${220 + id % 30} kg`,
      },
      "Naked": {
        engine: `${650 + id % 350}cc, Liquid-cooled, 4-stroke`,
        power: `${80 + id % 60} PS @ ${10000 + id % 2000} rpm`,
        torque: `${70 + id % 30} Nm @ ${8000 + id % 2000} rpm`,
        weight: `${190 + id % 25} kg`,
      },
      "Touring": {
        engine: `${1300 + id % 300}cc, Liquid-cooled, 6-cylinder`,
        power: `${160 + id % 40} PS @ ${9000 + id % 1000} rpm`,
        torque: `${170 + id % 30} Nm @ ${7000 + id % 1000} rpm`,
        weight: `${280 + id % 50} kg`,
      },
      "Electric": {
        engine: `Electric Motor, ${15 + id % 10}kWh battery`,
        power: `${50 + id % 40} kW`,
        torque: `${180 + id % 60} Nm`,
        weight: `${220 + id % 30} kg`,
      }
    };
    
    const specs = {
      ...engineSpecs[category],
      seatHeight: `${800 + id % 60} mm`,
      fuelCapacity: category === "Electric" ? "N/A" : `${14 + id % 6} litres`,
    };
    
    // Generate color options
    const allColors = [
      "Red", "Blue", "Black", "White", "Silver", "Green", "Yellow", "Orange", 
      "Gray", "Matte Black", "Gloss Black", "Racing Blue", "Pearl White"
    ];
    
    const colorCount = 2 + (id % 3); // 2-4 color options
    const colors = Array.from({ length: colorCount }, (_, i) => 
      allColors[(id + i) % allColors.length]
    );
    
    return {
      id,
      name,
      brand,
      category,
      price,
      discountPrice: id % 5 === 0 ? Math.round(price * 0.9) : undefined, // 20% of products have discounts
      description: `The ${name} from ${brand} delivers exceptional performance and style in the ${category} category, featuring advanced technology and premium components.`,
      specs,
      colors,
      images: Array.from({ length: 3 }, (_, i) => generateImage(id, i)),
      rating: randomRating(),
      reviewCount: randomReviews(),
      stock: randomStock(),
      featured: id % 15 === 0, // Some products are featured
      new: id % 12 === 0, // Some products are new
    };
  })
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product, count: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export const getFeaturedProducts = (count: number = 4): Product[] => {
  return products
    .filter(p => p.featured)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export const getNewProducts = (count: number = 8): Product[] => {
  return products
    .filter(p => p.new)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export const getAllBrands = (): string[] => {
  return [...new Set(products.map(p => p.brand))].sort();
};

export const getAllCategories = (): ProductCategory[] => {
  return categories;
};

export const getMinMaxPrice = (): [number, number] => {
  const prices = products.map(p => p.price);
  return [Math.min(...prices), Math.max(...prices)];
};
