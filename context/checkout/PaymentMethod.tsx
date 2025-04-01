"use client"

import { useCheckout } from "@/context/checkout-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCheckout()

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-lg font-semibold">Select Payment Method</h2>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="promptpay" id="promptpay" />
          <Label htmlFor="promptpay">PromptPay</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank">Bank Transfer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card">Credit/Debit Card</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
