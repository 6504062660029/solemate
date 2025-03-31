"use client"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/context/wishlist-context"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      image: item.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  const handleRemoveFromWishlist = (id: number, name: string) => {
    removeItem(id)

    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save items you love to your wishlist.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden group">
            <div className="relative aspect-square">
              <Link href={`/products/${item.id}`}>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 text-red-500"
                onClick={() => handleRemoveFromWishlist(item.id, item.name)}
              >
                <Trash2 className="h-5 w-5" />
                <span className="sr-only">Remove from wishlist</span>
              </Button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">
                    <Link href={`/products/${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.brand}</p>
                </div>
                <div className="text-right">
                  {item.originalPrice > item.price ? (
                    <div className="flex flex-col items-end">
                      <span className="text-base font-bold">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-base font-bold">${item.price.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-xs text-muted-foreground">({item.reviewCount})</span>
              </div>
              <Button className="w-full gap-2" onClick={() => handleAddToCart(item)}>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

