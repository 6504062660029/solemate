// This would normally connect to a real database
// For now, we'll use a mock database based on the image provided

export type Product = {
    id: number
    name: string
    slug: string
    brand: string
    category: string
    price: number
    originalPrice: number
    rating: number
    reviewCount: number
    colors: string[]
    sizes: string[]
    image_url: string
    description: string
    features: string[]
    specifications: Record<string, string>
    isNew: boolean
    isBestSeller: boolean
  }
  
  // Mock database based on the image provided
  export const products: Product[] = [
    {
      id: 1,
      name: "Air Max Pulse",
      slug: "air-max-pulse",
      brand: "Nike",
      category: "Athletic",
      price: 149.99,
      originalPrice: 169.99,
      rating: 4.8,
      reviewCount: 124,
      colors: ["Black/White", "Blue/Grey", "Red/Black"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "The Nike Air Max Pulse draws inspiration from the London music scene, bringing an underground touch to the iconic Air Max line. Its technical design delivers a tough, utility-focused silhouette that's built to withstand everyday wear and tear.",
      features: [
        "Mesh and synthetic upper for breathability and durability",
        "Air Max cushioning for responsive comfort",
        "Rubber outsole for traction and durability",
        "Pull tab on heel for easy on and off",
        "Padded collar for comfort",
      ],
      specifications: {
        material: "Mesh, Synthetic",
        cushioning: "Air Max",
        closure: "Lace-up",
        terrain: "Road, Gym",
        weight: "11.5 oz / 326 g",
        style: "Athletic",
      },
      isNew: true,
      isBestSeller: true,
    },
    {
      id: 2,
      name: "Ultraboost Light",
      slug: "ultraboost-light",
      brand: "Adidas",
      category: "Running",
      price: 189.99,
      originalPrice: 189.99,
      rating: 4.7,
      reviewCount: 98,
      colors: ["Core Black", "Cloud White", "Solar Red"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "Experience the lightest Ultraboost ever. The Adidas Ultraboost Light features Light BOOST, a new generation of adidas BOOST cushioning that's 30% lighter.",
      features: [
        "adidas PRIMEKNIT upper for adaptive support and comfort",
        "Light BOOST midsole for incredible energy return",
        "Continental™ Rubber outsole for extraordinary grip",
        "Linear Energy Push system for responsive stride",
        "Sock-like fit hugs the foot",
      ],
      specifications: {
        material: "Primeknit, Synthetic",
        cushioning: "Light BOOST",
        closure: "Lace-up",
        terrain: "Road, Track",
        weight: "10.2 oz / 289 g",
        style: "Running",
      },
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 3,
      name: "Classic Leather Loafer",
      slug: "classic-leather-loafer",
      brand: "Cole Haan",
      category: "Dress",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.5,
      reviewCount: 76,
      colors: ["Black", "Brown", "Tan"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "Timeless style meets modern comfort in these classic leather loafers. Perfect for both formal occasions and casual outings.",
      features: [
        "Premium full-grain leather upper",
        "Cushioned footbed for all-day comfort",
        "Leather lining for breathability",
        "Flexible rubber outsole",
        "Hand-stitched details",
      ],
      specifications: {
        material: "Full-grain leather",
        cushioning: "EVA",
        closure: "Slip-on",
        terrain: "Indoor, Casual",
        weight: "12 oz / 340 g",
        style: "Dress",
      },
      isNew: false,
      isBestSeller: true,
    },
    // Additional products from the image
    {
      id: 4,
      name: "Chuck Taylor All Star",
      slug: "chuck-taylor-all-star",
      brand: "Converse",
      category: "Casual",
      price: 59.99,
      originalPrice: 59.99,
      rating: 4.6,
      reviewCount: 215,
      colors: ["Black", "White", "Red", "Navy"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "The iconic Chuck Taylor All Star has been a symbol of self-expression for over 100 years. This classic sneaker features the timeless silhouette and signature details you've come to love.",
      features: [
        "Canvas upper for lightweight comfort",
        "Medial eyelets enhance airflow",
        "OrthoLite insole for cushioning",
        "Diamond pattern outsole for traction",
        "Signature Chuck Taylor ankle patch",
      ],
      specifications: {
        material: "Canvas, Rubber",
        cushioning: "OrthoLite",
        closure: "Lace-up",
        terrain: "Casual, Street",
        weight: "8.5 oz / 240 g",
        style: "Casual",
      },
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 5,
      name: "Terrex Free Hiker",
      slug: "terrex-free-hiker",
      brand: "Adidas",
      category: "Hiking",
      price: 199.99,
      originalPrice: 229.99,
      rating: 4.8,
      reviewCount: 87,
      colors: ["Core Black", "Grey", "Olive"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "Designed for those who seek adventure, the Terrex Free Hiker combines the comfort of a running shoe with the rugged durability needed for the trails.",
      features: [
        "Primeknit textile upper for adaptive support",
        "BOOST midsole for responsive cushioning",
        "Continental™ Rubber outsole for grip in wet conditions",
        "Waterproof GORE-TEX lining",
        "Molded toe cap for protection",
      ],
      specifications: {
        material: "Primeknit, GORE-TEX",
        cushioning: "BOOST",
        closure: "Lace-up",
        terrain: "Trail, Mountain",
        weight: "13.5 oz / 383 g",
        style: "Hiking",
      },
      isNew: false,
      isBestSeller: false,
    },
    // Add remaining products from the image
    {
      id: 6,
      name: "Old Skool",
      slug: "old-skool",
      brand: "Vans",
      category: "Skateboarding",
      price: 69.99,
      originalPrice: 69.99,
      rating: 4.7,
      reviewCount: 189,
      colors: ["Black/White", "Navy/White", "Red/White"],
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "The Vans Old Skool is a classic skate shoe and the first to feature the iconic Vans sidestripe. This low-top style has a durable suede and canvas upper with the signature waffle rubber outsole for enhanced board feel.",
      features: [
        "Suede and canvas upper for durability",
        "Padded collar for support and flexibility",
        "Signature rubber waffle outsole",
        "Reinforced toe caps for durability",
        "Vulcanized construction for board feel",
      ],
      specifications: {
        material: "Suede, Canvas",
        cushioning: "EVA",
        closure: "Lace-up",
        terrain: "Skate, Street",
        weight: "11 oz / 312 g",
        style: "Skateboarding",
      },
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 7,
      name: "Fresh Foam X 1080v12",
      slug: "fresh-foam-x-1080v12",
      brand: "New Balance",
      category: "Running",
      price: 159.99,
      originalPrice: 159.99,
      rating: 4.6,
      reviewCount: 112,
      colors: ["Black", "White", "Blue"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "The New Balance Fresh Foam X 1080v12 is a premium daily trainer designed for the runner seeking plush comfort and responsive performance. The Fresh Foam X midsole delivers a soft, smooth ride.",
      features: [
        "Hypoknit upper for strategic areas of stretch and support",
        "Fresh Foam X midsole for ultra-cushioned comfort",
        "Blown rubber outsole for durability",
        "Bootie construction for a snug, supportive fit",
        "Ortholite sockliner for premium underfoot comfort",
      ],
      specifications: {
        material: "Hypoknit, Synthetic",
        cushioning: "Fresh Foam X",
        closure: "Lace-up",
        terrain: "Road, Track",
        weight: "10.3 oz / 292 g",
        style: "Running",
      },
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 8,
      name: "Nano X3",
      slug: "nano-x3",
      brand: "Reebok",
      category: "Training",
      price: 139.99,
      originalPrice: 139.99,
      rating: 4.5,
      reviewCount: 94,
      colors: ["Black", "White", "Grey"],
      sizes: ["7", "8", "9", "10", "11", "12"],
      image_url: "/placeholder.svg?height=600&width=600",
      description:
        "The Reebok Nano X3 is designed for the functional fitness athlete. It features a Floatride Energy Foam midsole for responsive cushioning and a durable upper for support during high-intensity workouts.",
      features: [
        "Flexweave knit upper for breathability and durability",
        "Floatride Energy Foam for responsive cushioning",
        "Heel clip for added stability",
        "Rubber outsole for traction and durability",
        "Wide toe box for comfort during lifts",
      ],
      specifications: {
        material: "Flexweave, Synthetic",
        cushioning: "Floatride Energy Foam",
        closure: "Lace-up",
        terrain: "Gym, Cross-training",
        weight: "12.1 oz / 343 g",
        style: "Training",
      },
      isNew: true,
      isBestSeller: false,
    },
  ]
  
  export async function getProductById(id: number): Promise<Product | undefined> {
    return products.find((product) => product.id === id)
  }
  
  export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    return products.find((product) => product.slug === slug)
  }
  
  export async function getAllProducts(): Promise<Product[]> {
    return products
  }
  
  