"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: {
    id: number
    name: string
    brand: string
    price: number
    original_price: number | null
    rating: number
    review_count: number
    image_url: string
    is_new?: boolean
    is_best_seller?: boolean
    is_on_sale?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image_url || "/placeholder.svg?height=400&width=400",
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleWishlistToggle = () => {
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
        originalPrice: product.original_price || product.price,
        image: product.image_url || "/placeholder.svg?height=400&width=400",
        rating: product.rating,
        reviewCount: product.review_count,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      })
    }
  }

  return (
    <Card className="overflow-hidden group">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              width={400}
              height={400}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${inWishlist ? "text-red-500" : ""}`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
          <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
        </Button>
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.is_new && <Badge className="bg-blue-600 hover:bg-blue-700">New</Badge>}
          {product.is_best_seller && <Badge className="bg-amber-600 hover:bg-amber-700">Best Seller</Badge>}
          {product.original_price && product.original_price > product.price && (
            <Badge className="bg-red-600 hover:bg-red-700">Sale</Badge>
          )}
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-base">
              <Link href={`/products/${product.id}`} className="hover:underline">
                {product.name}
              </Link>
            </CardTitle>
            <CardDescription>{product.brand}</CardDescription>
          </div>
          <div className="text-right">
            {product.original_price && product.original_price > product.price ? (
              <div className="flex flex-col items-end">
                <span className="text-base font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">${product.original_price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-base font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center">
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
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
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

