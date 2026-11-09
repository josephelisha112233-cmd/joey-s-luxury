export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  image: string;
  tone: string;
};

export const products: Product[] = [
  { id: "jl-001", name: "The Regent Leather Loafer", category: "Formal Shoes", price: 89500, oldPrice: 110000, badge: "Bestseller", image: "/products/regent.svg", tone: "sand" },
  { id: "jl-002", name: "The Monaco Minimal Sneaker", category: "Casual Sneakers", price: 78500, badge: "New arrival", image: "/products/monaco.svg", tone: "cream" },
  { id: "jl-003", name: "The Oxford Heritage", category: "Formal Shoes", price: 112000, image: "/products/oxford.svg", tone: "sand" },
  { id: "jl-004", name: "The Verona Suede Driver", category: "Loafers", price: 96500, oldPrice: 120000, image: "/products/verona.svg", tone: "cream" }
];
