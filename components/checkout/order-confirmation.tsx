"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingDetails, PaymentMethod } from "@/app/checkout/page"
import { CheckCircle } from "lucide-react"

interface OrderConfirmationProps {
  orderId: string
  shippingDetails: ShippingDetails
  paymentMethod: PaymentMethod
  onBackToShopping: () => void
  orderSummary: {
    subtotal: number
    shipping: number
    tax: number
    total: number
  }
}

export function OrderConfirmation({
  orderId,
  shippingDetails,
  paymentMethod,
  onBackToShopping,
  orderSummary,
}: OrderConfirmationProps) {
  const getPaymentMethodName = (method: PaymentMethod): string => {
    switch (method) {
      case "credit_card":
        return "Credit/Debit Card"
      case "bank_transfer":
        return "Bank Transfer"
      default:
        return "Unknown"
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-center">
              Thank you for your order. We've sent a confirmation email to{" "}
              <span className="font-medium">{shippingDetails.email}</span>.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Order Details</h3>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Order Number:</div>
                <div className="font-medium">{orderId}</div>
                <div>Payment Method:</div>
                <div className="font-medium">{getPaymentMethodName(paymentMethod)}</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium">Shipping Address</h3>
              <div className="mt-2 text-sm">
                <p>
                  {shippingDetails.firstName} {shippingDetails.lastName}
                </p>
                <p>{shippingDetails.address}</p>
                {shippingDetails.apartment && <p>{shippingDetails.apartment}</p>}
                <p>
                  {shippingDetails.city}, {shippingDetails.state} {shippingDetails.postalCode}
                </p>
                <p>{shippingDetails.country}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {paymentMethod === "bank_transfer"
                ? "We'll process your order once we confirm your bank transfer."
                : "Your order will be processed immediately."}
            </p>
            <p className="text-sm text-muted-foreground">You'll receive shipping updates via email.</p>
          </div>

          <Button onClick={onBackToShopping} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

