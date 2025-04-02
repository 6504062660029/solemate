"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star, Truck, ShieldCheck, ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/hooks/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [quantity, setQuantity] = useState<number>(1)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch product data when component mounts
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`)
        const data = await response.json()
        console.log("Product data:", data.product)
        setProduct(data.product)

        // Set default color when product data is loaded
        if (data.product && data.product.colors && data.product.colors.length > 0) {
          setSelectedColor(data.product.colors[0])
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        // Set a default product if fetch fails
        setProduct({
          id: Number.parseInt(params.id),
          name: "Product not found",
          brand: "Unknown",
          price: 0,
          originalPrice: 0,
          rating: 0,
          reviewCount: 0,
          images: ["/placeholder.svg?height=600&width=600"],
          colors: [],
          sizes: [],
          description: "Product details could not be loaded.",
          features: [],
          specifications: {},
          isNew: false,
          isBestSeller: false,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const inWishlist = product ? isInWishlist(product.id) : false

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart",
        variant: "destructive",
      })
      return
    }

    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image_url,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleWishlistToggle = () => {
    if (!product) return

    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image_url,
        rating: product.rating,
        reviewCount: product.reviewCount,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">The product you are looking for does not exist or has been removed.</p>
        <Button className="mt-6" asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link href="/products" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            {/* Main product image */}
            <div className="relative aspect-square">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Link href={`/brands/${product.brand?.toLowerCase()}`}>
                <Badge variant="outline">{product.brand}</Badge>
              </Link>
              {product.isNew && <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>}
              {product.isBestSeller && <Badge className="bg-amber-600 hover:bg-amber-700">Best Seller</Badge>}
            </div>
            <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${product.price?.toFixed(2)}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice?.toFixed(2)}</span>
              )}
              {product.originalPrice > product.price && (
                <Badge className="ml-2 bg-red-600 hover:bg-red-700">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Price includes taxes</p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <label htmlFor="color" className="mb-2 block text-sm font-medium">
                Color
              </label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {(product.colors || []).map((color: string) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="size" className="mb-2 block text-sm font-medium">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {(product.sizes || []).map((size: string) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                Quantity
              </label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <SelectItem key={qty} value={qty.toString()}>
                      {qty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full gap-2" onClick={handleWishlistToggle}>
              <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">30-Day Returns</p>
                <p className="text-sm text-muted-foreground">Hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="mt-4">
            <ul className="list-inside list-disc space-y-2">
              {(product.features || []).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium capitalize">{key}</span>
                  <span>{value as string}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="text-center">
              <p>Customer reviews coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

