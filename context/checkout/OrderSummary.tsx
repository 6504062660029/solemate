import { useCart } from "@/context/cart-context"
import { Separator } from "@/components/ui/separator"

export default function OrderSummary() {
  const { subtotal, itemCount } = useCart()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>฿{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span>฿{tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>฿{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
