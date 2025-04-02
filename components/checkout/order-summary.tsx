import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/context/cart-context"

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export function OrderSummary({ items, subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-start space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-gray-100 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <div className="text-xs text-gray-500">No image</div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.color && item.size ? `${item.color}, Size ${item.size}` : ""}
                  </p>
                  <div className="flex justify-between">
                    <span className="text-sm">Qty: {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-muted-foreground">Order details saved</div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

