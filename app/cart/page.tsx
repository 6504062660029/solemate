"use client"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useEffect, useState } from "react"


export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session")
        const data = await res.json()
        setIsLoggedIn(data.loggedIn)
      } catch (error) {
        setIsLoggedIn(false)
      }
    }

    checkSession()
  }, [])


  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    if (newQuantity > 10) return
    updateQuantity(id, newQuantity)
  }

  if (items.length === 0) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to your cart to see them here.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-lg border">
            <div className="p-4 grid grid-cols-12 gap-4 font-medium text-sm">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            <Separator />

            {items.map((item) => (
              <div key={`฿{item.id}-฿{item.color}-฿{item.size}`}>
                <div className="p-4 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <div className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/products/฿{item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        {item.color && item.size && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.color}, Size {item.size}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-1 flex items-center text-xs text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">฿{Number(item.price).toFixed(2)}</div>
                  <div className="col-span-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="h-8 w-8 rounded-l border flex items-center justify-center hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value))}
                        className="h-8 w-12 rounded-none border-y text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="h-8 w-8 rounded-r border flex items-center justify-center hover:bg-muted"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-right font-medium">฿{(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-lg border p-6 space-y-6">
            <h2 className="text-lg font-medium">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span>฿{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>฿{(subtotal * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>฿{(subtotal + subtotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            {isLoggedIn ? (
              <Link href="/checkout">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="w-full" variant="outline">
                  Please login to Checkout
                </Button>
              </Link>
            )}
            <div className="text-center">
              <Link href="/products" className="text-sm text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

