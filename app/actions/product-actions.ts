"use server"

// Define fallback products that can be used across functions
const fallbackProducts = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 149.99,
    original_price: 169.99,
    rating: 4.8,
    review_count: 124,
    image_url: "image/pid1.png?height=300&width=300",
    is_new: true,
    is_best_seller: true,
  },
  {
    id: 2,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 189.99,
    original_price: 189.99,
    rating: 4.9,
    review_count: 86,
    image_url: "image/pid1.png?height=300&width=300",
    is_new: true,
    is_best_seller: false,
  },
  {
    id: 3,
    name: "Classic Leather Loafer",
    brand: "Cole Haan",
    price: 129.99,
    original_price: 159.99,
    rating: 4.7,
    review_count: 52,
    image_url: "image/pid1.png?height=300&width=300",
    is_new: false,
    is_best_seller: true,
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 59.99,
    original_price: 59.99,
    rating: 4.6,
    review_count: 215,
    image_url: "image/pid1.png?height=300&width=300",
    is_new: false,
    is_best_seller: true,
  },
]

// Fallback product for product detail pages
const fallbackProductDetail = {
  id: 1,
  name: "Sample Product",
  description: "This is a sample product description used when the database is not available.",
  price: 99.99,
  original_price: 129.99,
  brand: "Sample Brand",
  category: "Sample Category",
  rating: 4.5,
  review_count: 42,
  is_new: true,
  is_best_seller: false,
  images: ["image/pid1.png?height=600&width=600"],
  variants: [],
  colors: ["Black", "White"],
  sizes: ["8", "9", "10"],
}

export async function getFeaturedProducts() {
  console.log("Using fallback product data")
  return fallbackProducts
}

export async function getProducts() {
  console.log("Using fallback product data")
  return fallbackProducts
}

export async function getProductById(id: number) {
  console.log("Using fallback product data")
  return {
    ...fallbackProductDetail,
    id: id,
  }
}

export async function searchProducts(searchTerm: string) {
  console.log("Using fallback product data")
  // Filter fallback products based on search term for a more realistic experience
  return fallbackProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

