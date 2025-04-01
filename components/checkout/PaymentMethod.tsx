"use client"

import { useCheckout } from "@/context/checkout-context"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCheckout()

  return (
    <div className="space-y-2 border p-4 rounded">
      <Label className="text-lg font-medium">เลือกวิธีการชำระเงิน</Label>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
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
          <Label htmlFor="card">Credit / Debit Card</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
