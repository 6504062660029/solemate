"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OrderSummary from "@/context/checkout/OrderSummary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCheckout, CheckoutProvider } from "@/context/checkout-context"
import PaymentMethod from "@/components/checkout/PaymentMethod"

function CheckoutContent() {
  const { paymentMethod } = useCheckout()
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    slip: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setForm({ ...form, slip: file })
  }

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.address || !form.phone) {
      alert("Please complete shipping information")
      return
    }

    const formData = new FormData()
    formData.append("fullName", form.fullName)
    formData.append("address", form.address)
    formData.append("phone", form.phone)
    formData.append("paymentMethod", paymentMethod)
    if (form.slip) formData.append("slip", form.slip)

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: formData,
      credentials: "include",
    })

    const data = await res.json()
    if (res.ok) {
      alert("Order placed successfully!")
      router.push("/thank-you")
    } else {
      alert("Error: " + data.message)
    }
  }

  return (
    <div className="max-w-screen-md mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        <Label>Full Name</Label>
        <Input name="fullName" value={form.fullName} onChange={handleChange} />

        <Label>Address</Label>
        <Input name="address" value={form.address} onChange={handleChange} />

        <Label>Phone</Label>
        <Input name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <PaymentMethod />

      {paymentMethod === "promptpay" && (
        <div className="border p-4 rounded">
          <p className="mb-2">Scan this PromptPay QR Code:</p>
          <img src="/promptpay-qr.png" alt="PromptPay QR" className="w-48 h-48" />
        </div>
      )}

      {paymentMethod === "bank" && (
        <div className="space-y-2">
          <Label>Upload Slip</Label>
          <Input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="space-y-2">
          <Label>Card Number</Label>
          <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} />
          <div className="flex gap-2">
            <Input name="expMonth" placeholder="MM" value={form.expMonth} onChange={handleChange} />
            <Input name="expYear" placeholder="YYYY" value={form.expYear} onChange={handleChange} />
            <Input name="cvc" placeholder="CVV" value={form.cvc} onChange={handleChange} />
          </div>
        </div>
      )}

      <OrderSummary />

      <Button className="w-full" onClick={handlePlaceOrder}>
        Place Order
      </Button>

      <div className="text-center">
        <Link href="/cart" className="text-sm text-primary hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  )
}
