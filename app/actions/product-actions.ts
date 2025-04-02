"use server"

// Define fallback products with the 8 specific products provided
const fallbackProducts = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 149.99,
    original_price: 169.99,
    rating: 4.8,
    review_count: 124,
    image_url: "/image/pid1.png",
    is_new: true,
    is_best_seller: true,
    is_on_sale: true,
    category_id: 1,
    slug: "air-max-pulse",
    sku: "NIKE-AM-001",
    stock_quantity: 50,
    description:
      "The Nike Air Max Pulse draws inspiration from the London music scene, bringing an underground touch to the iconic Air Max line.",
  },
  {
    id: 2,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 189.99,
    original_price: 189.99,
    rating: 4.9,
    review_count: 86,
    image_url: "/image/pid2.png",
    is_new: true,
    is_best_seller: false,
    is_on_sale: false,
    category_id: 1,
    slug: "ultraboost-light",
    sku: "ADI-UB-001",
    stock_quantity: 35,
    description: "Experience epic energy with the new Ultraboost Light, our lightest Ultraboost ever.",
  },
  {
    id: 3,
    name: "Classic Leather Loafer",
    brand: "Cole Haan",
    price: 129.99,
    original_price: 159.99,
    rating: 4.7,
    review_count: 52,
    image_url: "/image/pid3.png",
    is_new: false,
    is_best_seller: true,
    is_on_sale: true,
    category_id: 3,
    slug: "classic-leather-loafer",
    sku: "CH-CLL-001",
    stock_quantity: 20,
    description: "Timeless leather loafers that combine comfort with sophisticated style.",
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 59.99,
    original_price: 59.99,
    rating: 4.6,
    review_count: 215,
    image_url: "/image/pid4.png",
    is_new: false,
    is_best_seller: true,
    is_on_sale: false,
    category_id: 2,
    slug: "chuck-taylor-all-star",
    sku: "CON-CT-001",
    stock_quantity: 100,
    description: "The iconic Chuck Taylor All Star is the classic sneaker that started it all.",
  },
  {
    id: 5,
    name: "Terrex Free Hiker",
    brand: "Adidas",
    price: 199.99,
    original_price: 229.99,
    rating: 4.8,
    review_count: 67,
    image_url: "/image/pid5.png",
    is_new: true,
    is_best_seller: false,
    is_on_sale: true,
    category_id: 4,
    slug: "terrex-free-hiker",
    sku: "ADI-TFH-001",
    stock_quantity: 15,
    description: "Designed for those who seek adventure and exploration in the great outdoors.",
  },
  {
    id: 6,
    name: "Old Skool",
    brand: "Vans",
    price: 69.99,
    original_price: 69.99,
    rating: 4.7,
    review_count: 183,
    image_url: "/image/pid6.png",
    is_new: false,
    is_best_seller: true,
    is_on_sale: false,
    category_id: 2,
    slug: "old-skool",
    sku: "VANS-OS-001",
    stock_quantity: 75,
    description: "The Vans Old Skool is a classic skate shoe and the first to feature the iconic Vans side stripe.",
  },
  {
    id: 7,
    name: "Fresh Foam X 1080v12",
    brand: "New Balance",
    price: 159.99,
    original_price: 159.99,
    rating: 4.8,
    review_count: 94,
    image_url: "/image/pid7.png",
    is_new: true,
    is_best_seller: false,
    is_on_sale: false,
    category_id: 1,
    slug: "fresh-foam-x-1080v12",
    sku: "NB-FF-001",
    stock_quantity: 30,
    description: "Experience premium comfort with the Fresh Foam X 1080v12 running shoe.",
  },
  {
    id: 8,
    name: "Nano X3",
    brand: "Reebok",
    price: 139.99,
    original_price: 139.99,
    rating: 4.6,
    review_count: 78,
    image_url: "/image/pid8.png",
    is_new: false,
    is_best_seller: false,
    is_on_sale: false,
    category_id: 1,
    slug: "nano-x3",
    sku: "RBK-NX-001",
    stock_quantity: 25,
    description: "The ultimate training shoe designed for stability and performance during workouts.",
  },
]

// Map category IDs to names for better display
const categoryMap = {
  1: "Athletic",
  2: "Casual",
  3: "Formal",
  4: "Outdoor",
  5: "Sandals",
}

// Update the getProductById function to return the correct product based on ID
export async function getProductById(id: number) {
  console.log("Using fallback product data for ID:", id)

  // Find the matching product from our fallback products
  const matchingProduct = fallbackProducts.find((product) => product.id === id)

  if (matchingProduct) {
    // Return the found product with additional detail fields
    const categoryName = categoryMap[matchingProduct.category_id as keyof typeof categoryMap] || "Unknown"

    return {
      ...matchingProduct,
      category: categoryName,
      // Use the same image_url for the images array
      images: [matchingProduct.image_url],
      colors: ["Black/White", "Blue/Grey", "Red/Black"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      features: [
        "Premium materials for durability and comfort",
        "Responsive cushioning for all-day wear",
        "Rubber outsole for traction and durability",
        "Breathable upper construction",
        "Padded collar for comfort",
      ],
      specifications: {
        material: "Mesh, Synthetic, Leather",
        cushioning: categoryName === "Athletic" ? "Responsive" : "Standard",
        closure: "Lace-up",
        terrain: categoryName === "Outdoor" ? "Trail, Hiking" : "Road, Casual",
        weight: "10.5 oz / 298 g",
        style: categoryName,
      },
      isNew: matchingProduct.is_new,
      isBestSeller: matchingProduct.is_best_seller,
      originalPrice: matchingProduct.original_price,
      reviewCount: matchingProduct.review_count,
    }
  }

  // If no matching product, return the default fallback with the requested ID
  return {
    id: id,
    name: `Product ${id}`,
    description: "This product could not be found.",
    price: 0,
    original_price: 0,
    brand: "Unknown",
    category: "Unknown",
    rating: 0,
    review_count: 0,
    is_new: false,
    is_best_seller: false,
    images: ["/placeholder.svg?height=600&width=600"],
    colors: [],
    sizes: [],
    features: [],
    specifications: {},
    isNew: false,
    isBestSeller: false,
  }
}

export async function getFeaturedProducts() {
  console.log("Using fallback product data")
  return fallbackProducts.filter((product) => product.id <= 4) // Return first 4 products as featured
}

export async function getProducts() {
  console.log("Using fallback product data")
  return fallbackProducts
}

export async function searchProducts(searchTerm: string) {
  console.log("Using fallback product data")
  // Filter fallback products based on search term for a more realistic experience
  return fallbackProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

