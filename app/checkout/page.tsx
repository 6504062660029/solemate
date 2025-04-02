"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { CheckoutSteps } from "@/components/checkout/checkout-steps"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentMethodForm } from "@/components/checkout/payment-method-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { OrderConfirmation } from "@/components/checkout/order-confirmation"
import { Container } from "@/components/ui/container"
import { useToast } from "@/hooks/use-toast"

export type ShippingDetails = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type PaymentMethod = "credit_card" | "bank_transfer"

export type CardDetails = {
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string>("")

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Thailand",
  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("credit_card")
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  })

  const handleShippingSubmit = (data: ShippingDetails) => {
    setShippingDetails(data)
    setCurrentStep(2)
    window.scrollTo(0, 0)
  }

  const generateOrderNumber = () => {
    const prefix = "SM-"
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    return `${prefix}${randomNum}`
  }

  const handlePaymentSubmit = async () => {
    console.log("[Checkout] handlePaymentSubmit called")
    setIsProcessing(true)

    try {
      setOrderSummary({ subtotal, shipping, tax, total })

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
          address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}, ${shippingDetails.postalCode}`,
          phone: shippingDetails.phone,
          paymentMethod: selectedPaymentMethod === "credit_card" ? "credit" : "bank_transfer",
          total: total.toFixed(2),
        }),
      })

      console.log("[Checkout] fetch /api/checkout status:", res.status)

      if (!res.ok) throw new Error("Failed to place order")

      const newOrderId = generateOrderNumber()
      setOrderId(newOrderId)

      toast({
        title: "Order placed successfully!",
        description: `Your order #${newOrderId} has been placed.`,
      })

      setCurrentStep(3)
      clearCart()
    } catch (error) {
      console.error("[Checkout] Payment error:", error)
      toast({
        title: "Error processing payment",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      window.scrollTo(0, 0)
    }
  }

  const handleBackToShopping = () => router.push("/products")

  if (items.length === 0 && currentStep !== 3) {
    return (
      <Container className="py-12 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add some products to your cart before proceeding to checkout.</p>
          <button
            onClick={() => router.push("/cart")}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Return to Cart
          </button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutSteps currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <ShippingForm
              initialValues={shippingDetails}
              onSubmit={handleShippingSubmit}
            />
          )}

          {currentStep === 2 && (
            <PaymentMethodForm
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
              cardDetails={cardDetails}
              onCardDetailsChange={setCardDetails}
              onBack={() => setCurrentStep(1)}
              onSubmit={handlePaymentSubmit}
              isProcessing={isProcessing}
              total={total}
            />
          )}

          {currentStep === 3 && (
            <OrderConfirmation
              orderId={orderId}
              shippingDetails={shippingDetails}
              paymentMethod={selectedPaymentMethod}
              onBackToShopping={handleBackToShopping}
              orderSummary={orderSummary}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            items={currentStep === 3 ? [] : items}
            subtotal={currentStep === 3 ? orderSummary.subtotal : subtotal}
            shipping={currentStep === 3 ? orderSummary.shipping : shipping}
            tax={currentStep === 3 ? orderSummary.tax : tax}
            total={currentStep === 3 ? orderSummary.total : total}
          />
        </div>
      </div>
    </Container>
  )
}
