
export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  description: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    weight: string;
    seatHeight: string;
    fuelCapacity: string;
  };
  colors: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured?: boolean;
  new?: boolean;
}

export type ProductCategory = "Sport" | "Cruiser" | "Adventure" | "Naked" | "Touring" | "Electric";

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number];
  brands: string[];
  sortBy: "price-low" | "price-high" | "rating" | "newest";
}
