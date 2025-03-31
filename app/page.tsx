import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, TrendingUp, Award, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "./actions/product-actions"
import { DbStatus } from "@/components/db-status"

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    text: "The most comfortable running shoes I've ever owned. I've already ordered a second pair!",
    rating: 5,
    product: "Air Max Pulse",
  },
  {
    id: 2,
    name: "Michael T.",
    text: "Great quality and fast shipping. These dress shoes are perfect for work and special events.",
    rating: 5,
    product: "Classic Leather Loafer",
  },
  {
    id: 3,
    name: "Emma R.",
    text: "Love the style and durability. These casual shoes go with everything in my wardrobe.",
    rating: 4,
    product: "Chuck Taylor All Star",
  },
]

export default async function Home() {
  // Get featured products (the function now handles errors internally)
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Add the DB Status component at the top of the page */}
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <DbStatus />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <Badge className="bg-white text-blue-700 hover:bg-blue-50">New Season Collection</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Step Into Style & Comfort</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-md">
              Discover our premium selection of footwear for every occasion. Quality meets style at SoleMate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/products">Explore More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 relative">
            <div className="relative h-[300px] md:h-[400px] w-full">
              <Image
                src="/image/pid1.png"
                alt="Featured shoes"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg">
              <span className="font-bold">Limited Time Offer:</span> Free Shipping on Orders $50+
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline" asChild>
              <Link href="/products" className="flex items-center">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="relative aspect-square">
                  <Image
                    src={product.image_url || "/pid1.png?height=300&width=300"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {product.original_price && product.original_price > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-600">Sale</Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-muted-foreground">({product.review_count})</span>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the page content remains the same */}
      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Summer Sale</h2>
              <p className="text-xl mb-6">Get up to 40% off on selected styles</p>
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-100" asChild>
                <Link href="/products">Shop the Sale</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-[200px] w-[300px] md:h-[300px] md:w-[400px]">
                <Image
                  src="/image/pid2.png"
                  alt="Summer sale promotion"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">On all orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <RotateCcw className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">30-day hassle-free returns</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">Only the best materials</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Latest Styles</h3>
              <p className="text-muted-foreground">Updated every season</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. See what our satisfied customers have to say about their SoleMate
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">on {testimonial.product}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md text-black"
                required
              />
              <Button className="bg-white text-blue-900 hover:bg-blue-50">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

