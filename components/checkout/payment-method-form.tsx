"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { PaymentMethod, CardDetails } from "@/app/checkout/page"
import { CreditCard, Building, ArrowLeft, Loader2 } from "lucide-react"

interface PaymentMethodFormProps {
  selectedMethod: PaymentMethod
  onMethodChange: (method: PaymentMethod) => void
  cardDetails: CardDetails
  onCardDetailsChange: (details: CardDetails) => void
  onBack: () => void
  onSubmit: () => void
  isProcessing: boolean
  total: number
}

export function PaymentMethodForm({
  selectedMethod,
  onMethodChange,
  cardDetails,
  onCardDetailsChange,
  onBack,
  onSubmit,
  isProcessing,
  total,
}: PaymentMethodFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCardDetailsChange = (field: keyof CardDetails, value: string) => {
    onCardDetailsChange({
      ...cardDetails,
      [field]: value,
    })

    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      })
    }
  }

  const validateCardDetails = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (selectedMethod === "credit_card") {
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required"
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Invalid card number"
      }

      if (!cardDetails.cardholderName.trim()) {
        newErrors.cardholderName = "Cardholder name is required"
      }

      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required"
      } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = "Invalid format (MM/YY)"
      }

      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required"
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "Invalid CVV"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateCardDetails()) {
      onSubmit()
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="mr-2" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <CardTitle>Payment Method</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => onMethodChange(value as PaymentMethod)}
          className="space-y-4"
        >
          <div
            className={`flex items-center space-x-2 rounded-md border p-4 ${selectedMethod === "credit_card" ? "border-primary" : ""}`}
          >
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card" className="flex items-center cursor-pointer flex-1">
              <CreditCard className="h-5 w-5 mr-2" />
              Credit / Debit Card
            </Label>
            <div className="flex space-x-1">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                VISA
              </div>
              <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center">MC</div>
            </div>
          </div>

          <div
            className={`flex items-center space-x-2 rounded-md border p-4 ${selectedMethod === "bank_transfer" ? "border-primary" : ""}`}
          >
            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
            <Label htmlFor="bank_transfer" className="flex items-center cursor-pointer flex-1">
              <Building className="h-5 w-5 mr-2" />
              Bank Transfer
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-6">
          {selectedMethod === "credit_card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => handleCardDetailsChange("cardNumber", formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={errors.cardNumber ? "border-red-500" : ""}
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={(e) => handleCardDetailsChange("cardholderName", e.target.value)}
                  className={errors.cardholderName ? "border-red-500" : ""}
                />
                {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => handleCardDetailsChange("expiryDate", formatExpiryDate(e.target.value))}
                    maxLength={5}
                    className={errors.expiryDate ? "border-red-500" : ""}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => handleCardDetailsChange("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    className={errors.cvv ? "border-red-500" : ""}
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          )}

          {selectedMethod === "bank_transfer" && (
            <div className="space-y-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Bank Account Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="font-medium">Kasikorn Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-medium">Pisit kasemtawin</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span className="font-medium">040-8-713-978</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Branch:</span>
                    <span className="font-medium">CSB</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Please transfer the exact amount of ฿{(total * 35).toFixed(2)} and use your email as the reference.
                  After transferring, please click "Complete Order" to confirm your payment.
                </p>
              </div>
            </div>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={isProcessing} className="w-full mt-6">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Complete Order (${selectedMethod === "credit_card" ? "$" : "฿"}${selectedMethod === "credit_card" ? total.toFixed(2) : (total * 35).toFixed(2)})`
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

